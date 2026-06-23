#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "=== Cardanomidnightappfitness setup ==="
echo "Cartella: $ROOT"
echo ""

check() {
  if [ ! -e "$1" ]; then
    echo "ERRORE: file non trovato:"
    echo "  $1"
    echo ""
    echo "Sei nella cartella giusta? Deve essere Cardanomidnightappfitness/"
    echo "Scarica con:"
    echo "  git clone https://github.com/SatoshiAllien/Cardanomidnightappfitness.git"
    exit 1
  fi
}

check "$ROOT/apps/api/.env.example"
check "$ROOT/apps/web/.env.example"
check "$ROOT/apps/api/package.json"
check "$ROOT/apps/web/package.json"
check "$ROOT/apps/ios/RunBadgeApp/RunBadgeApp.xcodeproj/project.pbxproj"

cp -n "$ROOT/apps/api/.env.example" "$ROOT/apps/api/.env" 2>/dev/null || cp "$ROOT/apps/api/.env.example" "$ROOT/apps/api/.env"
cp -n "$ROOT/apps/web/.env.example" "$ROOT/apps/web/.env.local" 2>/dev/null || cp "$ROOT/apps/web/.env.example" "$ROOT/apps/web/.env.local"

echo "✓ File .env creati"
echo "Installazione dipendenze..."

npm install
(cd "$ROOT/apps/api" && npm install)
(cd "$ROOT/apps/web" && npm install)

echo ""
echo "✓ Setup completato!"
echo ""
echo "Avvia web + API:"
echo "  npm run dev"
echo ""
echo "Apri iOS in Xcode (solo Mac):"
echo "  open apps/ios/RunBadgeApp/RunBadgeApp.xcodeproj"