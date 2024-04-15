import asyncio
import json
import httpx

from nested_lookup import nested_lookup
from parsel import Selector

# create HTTPX client with headers that resemble a web browser
client = httpx.AsyncClient(
    http2=True,
    follow_redirects=True,
    headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
    },
)


def parse_nextjs(html: str) -> dict:
    """extract nextjs cache from page"""
    selector = Selector(html)
    data = selector.css("script#__NEXT_DATA__::text").get()
    if not data:
        data = selector.css("script[data-name=query]::text").get()
        data = data.split("=", 1)[-1].strip().strip(";")
    data = json.loads(data)
    return data


async def scrape_product(url: str) -> dict:
    """scrape a single stockx product page for product data"""
    response = await client.get(url)
    assert response.status_code == 200
    data = parse_nextjs(response.text)
    # extract all products datasets from page cache
    products = nested_lookup("product", data)
    # find the current product dataset
    try:
        product = next(p for p in products if p.get("urlKey") in str(response.url))
    except StopIteration:
        raise ValueError("Could not find product dataset in page cache", response)
    return product


# example use:
url = "https://stockx.com/nike-air-max-90-se-running-club"
print(asyncio.run(scrape_product(url)))