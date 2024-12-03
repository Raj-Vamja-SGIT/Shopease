interface InventoryStatus {
    label: string;
    value: string;
}
export interface Products {
    id?: string;
    code?: string;
    productName?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string; 
    rating?: number;
}