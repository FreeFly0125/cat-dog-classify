from fastapi import APIRouter, status, HTTPException
from app.services.fetch_imgs import fetch_animal_imgs
from app.api.animal_img.ratelimit import rateLimiter

router = APIRouter()


@router.get(path="/fetchimgs", response_model=object, status_code=status.HTTP_200_OK)
def img_fetch_request():
    if rateLimiter.check_request_rate() is False:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={"message": "You are limited only 1 req per minute"},
        )
    
    (img_url, fetch_time, animal_type) = fetch_animal_imgs()
    return {
        "url": img_url,
        "fetch_time": fetch_time,
        "type": animal_type,
        "message": "Image Fetching Successed!",
    }
