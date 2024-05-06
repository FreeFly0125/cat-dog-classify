from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from app.api.animal_img.routes import router
from app.consts.gVars import settings
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(path="/health", status_code=200)
def checkServerHealth():
    return {"status": "Hello, World"}


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


app.mount("/public", StaticFiles(directory=settings.PUBLIC_FOLDER), name="static")


app.include_router(router=router)
