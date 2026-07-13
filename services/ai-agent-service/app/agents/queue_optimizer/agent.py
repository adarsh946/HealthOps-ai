from langgraph.prebuilt import create_react_agent
from app.agents.queue_optimizer.tools import get_waiting_patients, get_current_time
from app.agents.queue_optimizer.prompts import QUEUE_OPTIMIZER_PROMPT
import os
from langchain_groq import ChatGroq
llm = ChatGroq(model=os.getenv("GROQ_MODEL"), temperature=0)


def queue_optimizer():
    '''Return the queue of patients.'''

    graph = create_react_agent(
        llm,
        tools=[get_waiting_patients, get_current_time],
        state_modifier=QUEUE_OPTIMIZER_PROMPT
    )

    return graph
