import { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import useAuth from "../../Auth/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId, setError } from "../chat.slice";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function Dashboard() {
  const [message, setMessage] = useState("");
  const chatHook = useChat()
  const authHook = useAuth()
  const chats = useSelector((state) => state.chat.chats)
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    chatHook.initializeSocketConnection()
    chatHook.handleGetChats()
    chatHook.loadAvailableModels()
    authHook.handleGetMe()
  }, [])


  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const currentChat = useSelector((state) => state.chat.chats[currentChatId])
  const currentMessages = currentChat?.messages || []

  const availableModels = useSelector((state) => state.chat.availableModels)
  const selectedModelKey = useSelector((state) => state.chat.selectedModelKey)
  const selectedModel = availableModels.find((m) => m.key === selectedModelKey)

  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  console.log('current Chat : ', currentChat)



  const isLoading = useSelector((state) => state.chat.isLoading)
  const chatError = useSelector((state) => state.chat.error)

  async function handleSubmit(e) {

    e.preventDefault()

    const trimMessage = message.trim()

    if (!trimMessage || isLoading) return

    try {
      await chatHook.handleSendMessage({
        message: trimMessage,
        chatId: currentChatId
      })
      setMessage('')
    } catch (err) {
      // error is already in state.chat.error and shown as a banner —
      // keep the message in the input so the user doesn't lose it and can retry
    }
  }

  const startNewChat = () => {
    dispatch(setCurrentChatId(null))
    setMessage('')
    setIsSidebarOpen(false)
  }

  const openChat = async (chatId) => {
    chatHook.handleOpenChats(chatId, chats)
    setIsSidebarOpen(false)
  }


  return (
    <div className="relative flex h-screen bg-bg-dark text-text-inverse font-body overflow-hidden">

      {/* Aurora backdrop — the one bold moment on the page */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-24 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[26rem] h-[26rem] bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col
          bg-glass-bg-dark backdrop-blur-xl border-r border-glass-border-dark
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#0B1412" />
              </svg>
            </div>
            <h1 className="font-heading text-lg font-semibold text-text-inverse">
              Perplexity
            </h1>
          </div>

          {/* Close button — mobile only */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-inverse-muted transition hover:bg-white/5 hover:text-text-inverse lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-4 pb-4">
          <button
            onClick={startNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-heading text-sm font-semibold text-bg-dark transition hover:bg-primary-hover active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3">
          <p className="mb-2 px-3 text-xs font-medium text-text-inverse-muted">
            Recent chats
          </p>

          <div className="space-y-0.5">
            {Object.values(chats).map((chat) => {
              const isActive = chat.id === currentChatId
              return (
                <button
                  key={chat.id}
                  onClick={() => openChat(chat.id, chat)}
                  className={`flex w-full items-center gap-2.5 truncate rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isActive
                      ? "bg-glass-bg-dark-strong text-text-inverse"
                      : "text-text-inverse-muted hover:bg-white/5 hover:text-text-inverse"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? "bg-primary" : "bg-white/20"}`} />
                  <span className="truncate">{chat.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-glass-border-dark p-4">
          <div className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-heading font-semibold text-bg-dark">
              {user?.username ? user.username[0].toUpperCase() : "?"}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-text-inverse truncate">
                {user?.username || "Guest"}
              </h3>
              <p className="text-xs text-text-inverse-muted">Free plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CHAT ================= */}

      <main className="flex flex-1 flex-col min-w-0">

        {/* Top Navbar */}
        <header className="relative grid grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-4 sm:px-8 sm:py-5 lg:grid-cols-[1fr_auto_1fr]">

          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — mobile/tablet only */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-glass-border-dark bg-white/5 text-text-inverse-muted transition hover:bg-white/10 hover:text-text-inverse lg:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="min-w-0 hidden lg:block">
              <h2 className="font-heading text-base font-semibold text-text-inverse truncate">
                New conversation
              </h2>
              <p className="text-sm text-text-inverse-muted truncate">
                Ask anything, I'm here to help.
              </p>
            </div>
          </div>

          {/* Model Switcher — centered, the one deliberate focal point in the header */}
          <div className="relative flex justify-center min-w-0">
            <button
              onClick={() => setIsModelMenuOpen((open) => !open)}
              disabled={availableModels.length === 0}
              className="
                flex items-center gap-1.5 sm:gap-2 rounded-full
                border border-glass-border-dark bg-glass-bg-dark backdrop-blur-md
                px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-text-inverse
                transition hover:bg-white/10
                disabled:opacity-50
                max-w-[45vw] sm:max-w-none
              "
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-primary">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
              </svg>
              <span className="font-heading truncate">
                {selectedModel ? selectedModel.label : "Loading…"}
              </span>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className={`shrink-0 text-text-inverse-muted transition-transform ${isModelMenuOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isModelMenuOpen && (
              <>
                {/* click-outside catcher */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsModelMenuOpen(false)}
                />

                <div
                  className="
                    absolute top-full z-50 mt-2 w-72 max-w-[90vw]
                    rounded-2xl border border-glass-border-dark bg-glass-bg-dark-strong
                    backdrop-blur-xl shadow-[0_12px_40px_var(--color-glass-shadow-dark)]
                    p-1.5
                  "
                >
                  {availableModels.map((model) => {
                    const isSelected = model.key === selectedModelKey
                    return (
                      <button
                        key={model.key}
                        onClick={() => {
                          chatHook.handleModelChange(model.key)
                          setIsModelMenuOpen(false)
                        }}
                        className={`
                          flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition
                          ${isSelected ? "bg-primary/10" : "hover:bg-white/5"}
                        `}
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            isSelected ? "bg-primary" : "bg-white/20"
                          }`}
                        />
                        <span className="flex-1">
                          <span className="block font-heading text-sm font-medium text-text-inverse">
                            {model.label}
                          </span>
                          {model.description && (
                            <span className="block text-xs text-text-inverse-muted mt-0.5">
                              {model.description}
                            </span>
                          )}
                        </span>
                        {isSelected && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-glass-border-dark bg-white/5 text-text-inverse-muted transition hover:bg-white/10 hover:text-text-inverse">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Error banner */}
        {chatError && (
          <div className="mx-4 mt-3 sm:mx-6 flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-text-inverse">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-danger">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="flex-1">{chatError}</p>
            <button
              onClick={() => dispatch(setError(null))}
              className="shrink-0 text-text-inverse-muted transition hover:text-text-inverse"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Messages */}
        <section className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:gap-5 px-4 py-4 sm:px-6 sm:py-8">

            {currentMessages.length === 0 && (
              <div className="mt-12 sm:mt-20 text-center px-4">
                <div className="mx-auto mb-4 sm:mb-5 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/15">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#22C39A" />
                  </svg>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-text-inverse">
                  How can I help you today?
                </h2>
                <p className="mt-2 text-sm text-text-inverse-muted">
                  Ask me anything and I'll do my best to help.
                </p>
              </div>
            )}

            {currentMessages.map((message, index) => {
              const isUser = message.role === "user"
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-heading font-semibold ${
                      isUser ? "bg-secondary text-bg-dark" : "bg-primary/15 text-primary"
                    }`}
                  >
                    {isUser ? (user?.username ? user.username[0].toUpperCase() : "U") : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                      </svg>
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] w-fit rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm md:text-base backdrop-blur-md ${
                      isUser
                        ? "rounded-tr-sm bg-secondary/15 border border-secondary/20 text-text-inverse"
                        : "rounded-tl-sm bg-glass-bg-dark border border-glass-border-dark text-text-inverse"
                    }`}
                  >
                    {isUser ? (
                      <p>{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                          h1: ({ children }) => <h1 className="mb-3 font-heading text-2xl font-semibold">{children}</h1>,
                          h2: ({ children }) => <h2 className="mb-2 font-heading text-xl font-semibold">{children}</h2>,
                          h3: ({ children }) => <h3 className="mb-2 font-heading text-lg font-semibold">{children}</h3>,
                          ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>,
                          ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>,
                          code: ({ children }) => <code className="rounded bg-black/30 px-1.5 py-0.5 text-sm">{children}</code>,
                          pre: ({ children }) => <pre className="mb-3 overflow-x-auto rounded-xl bg-black/30 border border-glass-border-dark p-4">{children}</pre>,
                          blockquote: ({ children }) => (
                            <blockquote className="my-3 border-l-2 border-primary/40 pl-4 italic text-text-inverse-muted">
                              {children}
                            </blockquote>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Shimmer — shown while waiting for the AI's reply */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                  </svg>
                </div>

                <div className="rounded-2xl rounded-tl-sm border border-glass-border-dark bg-glass-bg-dark px-4 py-3.5 w-56 max-w-[80%]">
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden relative">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    </div>
                    <div className="h-3 w-4/5 rounded-full bg-white/10 overflow-hidden relative">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent [animation-delay:150ms]" />
                    </div>
                    <div className="h-3 w-3/5 rounded-full bg-white/10 overflow-hidden relative">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Input */}
        <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-glass-border-dark bg-glass-bg-dark backdrop-blur-xl p-1.5 pl-3 sm:p-2 sm:pl-4 transition focus-within:border-primary/40"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message Perplexity..."
              className="flex-1 min-w-0 bg-transparent py-2 sm:py-2.5 text-sm text-text-inverse outline-none placeholder:text-text-inverse-muted"
            />

            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-bg-dark transition hover:bg-primary-hover active:scale-[0.95] disabled:opacity-40 disabled:hover:bg-primary"
            >
              {isLoading ? (
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-90" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              )}
            </button>
          </form>

          <p className="mt-3 text-center text-xs text-text-inverse-muted">
            Perplexity can make mistakes. Check important information.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
