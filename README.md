# tersea-test

# Mini CRM

### Installation et utilisation

 1. Cloner le repo
 2. Copier .env.example vers .env.local (ou .env) sur le client et le serveur.
 3. Remplir .env avec les bonnes variables
 4. Pour la base de données utilisée dans le projet, Postgres
 5. Si vous ne voulez pas mettre en place une image docker pour la base de données, utilisez une base de données Postgres hébergée sur Supabase (comme je l'ai fait).
 6. Exécuter pnpm dev sur le client et le serveur 
 7. Une fois que le serveur démarre, la base de données devrait être remplie avec des tables. 
 8. Une fois le serveur démarré, allez sur api/user/init cela créera un compte administrateur pour vous.
 9. Les informations d'identification de l'administrateur sont les suivantes 
'admin@email.com', 
'password123'
 10. Après cela, allez sur le client, essayez de vous connecter et commencez à tester le programme.
