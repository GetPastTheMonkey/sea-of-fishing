import requests


def load_fishes(rat: str) -> dict[str, list[dict[str, int]]]:
    response = requests.get(
        url="https://www.seaofthieves.com/api/profilev2/reputation",
        headers={
            # Referer header is required, as there is a 403 otherwise
            "Referer": "https://www.seaofthieves.com/profile/reputation",
            "User-Agent": "SeaOfFishing/0.1",
        },
        cookies={
            "rat": rat,
        }
    )

    response.raise_for_status()
    response_data = response.json()
    campaigns = response_data["HuntersCall"]["Campaigns"]

    fishes_dict = {}  # type: dict[str, list[dict[str, int]]]

    for key, campaign in campaigns.items():
        variants = []

        for idx, emblem in enumerate(campaign["Emblems"]):
            variant = {
                "idx": idx,
                "val": emblem["Value"]
            }

            variants.append(variant)

        fishes_dict[key] = variants

    return fishes_dict
