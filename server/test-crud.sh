#!/bin/bash

# =========================
# Script pour tester le CRUD
# =========================
# Assurez-vous que le serveur est en cours d'exécution avant d'exécuter le script.
#!/bin/bash

echo "=== 1. GET produits initiaux ==="
curl http://localhost:4000/api/products
echo -e "\n"

echo "=== 2. POST un nouveau produit ==="
NEW_PRODUCT=$(curl -s -X POST http://localhost:4000/api/products \
-H "Content-Type: application/json" \
-d '{"name":"Test Phone","type":"phone","price":299.99,"rating":4.5,"warranty_years":2,"available":true}')
echo $NEW_PRODUCT
ID=$(echo $NEW_PRODUCT | sed -n 's/.*"_id":"\([^"]*\)".*/\1/p')
echo "Nouveau produit créé avec ID=$ID"
echo -e "\n"

echo "=== 3. GET par ID ==="
curl http://localhost:4000/api/products/$ID
echo -e "\n"

echo "=== 4. PUT (mise à jour produit) ==="
curl -X PUT http://localhost:4000/api/products/$ID \
-H "Content-Type: application/json" \
-d '{"name":"Test Phone Updated","price":399.99}'
echo -e "\n"

echo "=== 5. DELETE produit ==="
curl -X DELETE http://localhost:4000/api/products/$ID
echo -e "\n"

echo "=== 6. GET final ==="
curl http://localhost:4000/api/products
echo -e "\n"
echo "=== Test CRUD terminé ==="


