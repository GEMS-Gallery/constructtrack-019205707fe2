import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const inventoryList = document.getElementById('inventory-list');
    const addItemForm = document.getElementById('add-item-form');
    const updateItemForm = document.getElementById('update-item-form');
    const removeItemForm = document.getElementById('remove-item-form');

    async function refreshInventory() {
        const inventory = await backend.getInventory();
        inventoryList.innerHTML = '<h2>Current Inventory</h2>';
        inventory.forEach(item => {
            inventoryList.innerHTML += `
                <div>
                    ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity} ${item.unit}
                </div>
            `;
        });
    }

    addItemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('new-item-name').value;
        const quantity = parseInt(document.getElementById('new-item-quantity').value);
        const unit = document.getElementById('new-item-unit').value;

        await backend.addSupplyItem(name, quantity, unit);
        addItemForm.reset();
        await refreshInventory();
    });

    updateItemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('update-item-id').value);
        const name = document.getElementById('update-item-name').value;
        const quantity = parseInt(document.getElementById('update-item-quantity').value);
        const unit = document.getElementById('update-item-unit').value;

        const success = await backend.updateSupplyItem(id, name, quantity, unit);
        if (success) {
            updateItemForm.reset();
            await refreshInventory();
        } else {
            alert('Failed to update item. Please check the ID.');
        }
    });

    removeItemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('remove-item-id').value);

        const success = await backend.removeSupplyItem(id);
        if (success) {
            removeItemForm.reset();
            await refreshInventory();
        } else {
            alert('Failed to remove item. Please check the ID.');
        }
    });

    await refreshInventory();
});
