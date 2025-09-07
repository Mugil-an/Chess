# ♟️ React Chessboard with WebSocket

This is a simple **React + TypeScript + chess.js** chessboard project where users can click squares to make moves, and moves are sent via **WebSocket** to sync with other players or a backend.

---

## 🚀 Features

- Chessboard UI rendered dynamically from `chess.js`
- Click-to-move functionality
- Real-time move updates using **WebSocket**
- Styled using **TailwindCSS**
- Piece images stored in `/public/`

## ⚡ Getting Started

###  Clone the repository
```bash
git clone https://github.com/Mugil-an/Chess.git
cd Chess

Install dependencies
npm install


🔌 WebSocket Move Payload
{
  "type": "MOVE",
  "payload": {
    "move": {
      "from": "e2",
      "to": "e4"
    }
  }
}

