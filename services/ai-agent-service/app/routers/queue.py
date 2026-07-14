from fastapi import APIRouter, Request, HTTPException
import httpx
from app.agents.queue_optimizer.agent import queue_optimizer_agent
import os


router = APIRouter()


@router.post('/queue/optimize')
async def optimize_queue(request: Request):

    try:

        hospital_id = request.headers.get("X-Hospital-Id")

        if not hospital_id:
            return HTTPException(status_code=400, detail="Header 'x-hospital-id' is missing or invalid.")

        graph = queue_optimizer_agent()
        response = graph.invoke({
            "messages": [{
                "role": "user",
                "content": f"Optimize the waiting queue for hospital {hospital_id}"
            }]
        })

        result = response["messages"][-1].content

        async with httpx.AsyncClient() as client:
            await client.post(
                f"{os.getenv('REALTIME_SERVICE_URL')}/broadcast/queue",
                json={
                    "event": "queue_optimized",
                    "hospitalId": hospital_id,
                    "data": result,
                }
            )

        return {
            "success": True,
            "hospitalId": hospital_id,
            "data": result,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Queue optimization failed: {str(e)}"
        )
