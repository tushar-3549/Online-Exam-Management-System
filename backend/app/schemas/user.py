from pydantic import BaseModel, EmailStr
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str = "student"

class UserRead(UserBase):
    id: UUID

    class Config:
        orm_mode = True
