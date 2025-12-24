'use client'

import { useEffect, useMemo, useState } from 'react'

interface TicTacToeSantaProps {
  onBack: () => void
}

type Cell = 'X' | 'O' | null

type GameState = 'playing' | 'user-won' | 'santa-won' | 'draw'

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkWinner(board: Cell[]): GameState {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === 'X' ? 'user-won' : 'santa-won'
    }
  }
  if (board.every(Boolean)) return 'draw'
  return 'playing'
}

function minimax(board: Cell[], isSantaTurn: boolean, depth: number, maxDepth: number): { score: number; move: number | null } {
  const state = checkWinner(board)
  if (state === 'santa-won') return { score: 10 - depth, move: null }
  if (state === 'user-won') return { score: depth - 10, move: null }
  if (state === 'draw') return { score: 0, move: null }
  if (depth >= maxDepth) return { score: 0, move: null }

  let bestMove: number | null = null
  let bestScore = isSantaTurn ? -Infinity : Infinity

  for (let i = 0; i < 9; i++) {
    if (board[i]) continue
    board[i] = isSantaTurn ? 'O' : 'X'
    const { score } = minimax(board, !isSantaTurn, depth + 1, maxDepth)
    board[i] = null

    if (isSantaTurn) {
      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    } else {
      if (score < bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }

  return { score: bestScore, move: bestMove }
}

function pickSantaMove(board: Cell[]): number | null {
  const available = board.map((v, idx) => (v ? -1 : idx)).filter((v) => v >= 0)
  if (!available.length) return null

  // 65% optimal (depth 6), 35% softer/random to let user win sometimes
  const roll = Math.random()
  if (roll < 0.35) {
    // softer: shallow search then random fallback
    const { move } = minimax([...board], true, 0, 3)
    if (move !== null) return move
    return available[Math.floor(Math.random() * available.length)]
  }

  const { move } = minimax([...board], true, 0, 6)
  if (move !== null) return move
  return available[Math.floor(Math.random() * available.length)]
}

export default function TicTacToeSanta({ onBack }: TicTacToeSantaProps) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [gameState, setGameState] = useState<GameState>('playing')
  const [isSantaThinking, setIsSantaThinking] = useState(false)
  const [startingPlayerToggle, setStartingPlayerToggle] = useState(0)
  const [turn, setTurn] = useState<'user' | 'santa'>('user')

  // Switch music to Dark_Christmas when this page loads
  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement | null
    if (!audio) return
    audio.src = '/Dark%20Christmas.mp3'
    audio.load()
    audio.play().catch(() => {
      // Autoplay might be blocked; user can tap play
    })
  }, [])

  useEffect(() => {
    setGameState(checkWinner(board))
  }, [board])

  useEffect(() => {
    if (gameState !== 'playing') {
      setIsSantaThinking(false)
      return
    }
    if (turn === 'user') return

    setIsSantaThinking(true)
    const timer = setTimeout(() => {
      setBoard((prev) => {
        const chosen = pickSantaMove([...prev])
        if (chosen === null) return prev
        const next = [...prev]
        next[chosen] = 'O'
        setTurn('user')
        return next
      })
      setIsSantaThinking(false)
    }, 450 + Math.random() * 250)

    return () => clearTimeout(timer)
  }, [turn, gameState])

  const handleCellClick = (idx: number) => {
    if (gameState !== 'playing') return
    if (turn !== 'user') return
    if (board[idx]) return

    const next = [...board]
    next[idx] = 'X'
    setBoard(next)
    setTurn('santa')
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setGameState('playing')
    setIsSantaThinking(false)
    setStartingPlayerToggle((n) => {
      const next = n + 1
      setTurn(next % 2 === 1 ? 'santa' : 'user')
      return next
    })
  }

  useEffect(() => {
    if (startingPlayerToggle % 2 === 1) {
      // Santa starts occasionally for variety
      setTurn('santa')
    } else {
      setTurn('user')
    }
  }, [startingPlayerToggle])

  const statusText = (() => {
    if (gameState === 'user-won') return 'You win! Santa tips his hat 🎩'
    if (gameState === 'santa-won') return 'Santa wins! Better luck next time ❄️'
    if (gameState === 'draw') return "It's a draw! Peace on earth ✨"
    if (isSantaThinking) return 'Santa is thinking...'
    return 'Your turn! Place an X'
  })()

  const resultText = (() => {
    if (gameState === 'user-won') return 'You won! HO HO HO!'
    if (gameState === 'santa-won') return 'Santa won! HO HO HO!'
    if (gameState === 'draw') return 'Game drawn! HO HO HO!'
    return null
  })()

  return (
    <div className="relative min-h-screen p-4 md:p-8 flex items-center justify-center overflow-hidden">
      <div className="relative max-w-3xl w-full bg-slate-900/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700 z-10">
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-all"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={resetGame}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold shadow-md transition-all"
          >
            New Round
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-christmas text-christmas-gold glow-text">Santa Tic Tac Toe</h2>
          <p className="text-sm md:text-base text-gray-200 mt-2">Santa mixes smart moves with occasional slips. Can you catch him?</p>
        </div>

        <div className="text-center mb-4">
          <span className="inline-block px-3 py-2 rounded-full bg-black/40 border border-white/10 text-white text-sm md:text-base">
            {statusText}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto">
          {board.map((cell, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCellClick(idx)}
              className={`aspect-square rounded-2xl border-2 border-white/20 bg-white/10 text-4xl md:text-5xl font-bold text-white shadow-lg transition-all hover:scale-105 ${
                cell ? 'cursor-default' : 'hover:border-christmas-gold'
              }`}
              disabled={!!cell || gameState !== 'playing' || turn !== 'user'}
            >
              {cell === 'X' ? '❄️' : cell === 'O' ? '🎅' : ''}
            </button>
          ))}
        </div>

        {resultText && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-christmas-red/70 via-christmas-gold/60 to-green-700/60 border border-white/20 text-white shadow-xl">
              <span className="text-xl">🎅</span>
              <span className="text-base md:text-lg font-semibold tracking-wide">{resultText}</span>
              <span className="text-xl">🎄</span>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-gray-200 text-sm md:text-base">
          <p>Icons: You are ❄️ (X) — Santa is 🎅 (O)</p>
        </div>
      </div>
    </div>
  )
}
