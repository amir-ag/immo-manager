import React from "react";

export type PropertyData = {
    id: string
    street: string,
    city: string,
    details: string,
    handleEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
