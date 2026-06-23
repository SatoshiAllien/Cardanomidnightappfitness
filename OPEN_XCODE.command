#!/bin/bash
PROJECT="$(cd "$(dirname "$0")" && pwd)/apps/ios/RunBadgeApp/RunBadgeApp.xcodeproj"

if [ ! -d "$PROJECT" ]; then
  osascript -e "display alert \"File non trovato\" message \"Non trovo:\n$PROJECT\n\nEsegui prima:\ngit clone https://github.com/SatoshiAllien/Cardanomidnightappfitness.git\""
  exit 1
fi

open "$PROJECT"