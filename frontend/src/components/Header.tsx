'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Crown, Swords, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAV_ITEMS } from '@/lib/constants'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, loading, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
            <Swords className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold">
            <span className="gradient-text">FH6</span>
            <span className="text-foreground"> Guide</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {loading ? null : user ? (
            <>
              <Link href="/membership/portal" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-accent transition-colors">
                <div className="h-7 w-7 rounded-full bg-brand-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium max-w-[100px] truncate">{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link href="/membership/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/membership/register">
                <Button variant="gold" size="sm" className="gap-1.5">
                  <Crown className="h-4 w-4" />
                  Premium
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container-custom py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-border my-3" />
            {user ? (
              <>
                <Link href="/membership/portal" className="block px-4 py-2.5" onClick={() => setMobileOpen(false)}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user.username}</span>
                  </div>
                </Link>
                <button
                  onClick={() => { logout(); setMobileOpen(false) }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground w-full"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/membership/login" className="block px-4 py-2.5" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">Log in</Button>
                </Link>
                <Link href="/membership/register" className="block px-4" onClick={() => setMobileOpen(false)}>
                  <Button variant="gold" className="w-full gap-2">
                    <Crown className="h-4 w-4" />
                    Get Premium
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
