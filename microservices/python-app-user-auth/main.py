from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import routes
from dotenv import load_dotenv
import uvicorn

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


for route in routes.routes:
    app.include_router(route)

@app.get("/")
async def index():
    return {"api_status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)