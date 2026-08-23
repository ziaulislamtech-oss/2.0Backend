import { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function Dashboard() {
  const [message, setMessage] = useState("");
  const chatHook = useChat()
  const chats = useSelector((state) => state.chat.chats)
  const dispatch = useDispatch()

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "user",
      content: "What is Artificial Intelligence?",
    },
    {
      id: 2,
      role: "ai",
      content:
        "Artificial Intelligence (AI) is a field of computer science that focuses on creating systems capable of performing tasks that normally require human intelligence.",
    },
  ]);

  useEffect(() => {
    chatHook.initializeSocketConnection()
    chatHook.handleGetChats()
  }, [])


  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const currentChat = useSelector((state) => state.chat.chats[currentChatId])

  console.log('current Chat : ', currentChat)



  const isLoading = useSelector((state) => {
    state.chat.isLoading
  })

  async function handleSubmit(e) {

    e.preventDefault()

    console.log('submitting..')

    const trimMessage = message.trim()

    if (!trimMessage) return

    await chatHook.handleSendMessage({
      message: trimMessage,
      chatId: currentChatId
    })

    setMessage('')
  }

  const openChat = async (chatId) => {
    chatHook.handleOpenChats(chatId, chats)
  }


  return (
    <div className="flex h-screen bg-[#111827] text-white">
      {/* ================= SIDEBAR ================= */}

      <aside className="flex w-72 flex-col border-r border-gray-800 bg-[#0b1120]">
        {/* Logo */}
        <div className="border-b border-gray-800 p-5">
          <h1 className="text-2xl font-bold">
            Perplexity<span className="text-blue-500">AI</span>
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Your AI Assistant
          </p>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={() => console.log(currentChat)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium transition hover:bg-blue-700"
          >
            <span className="text-xl">+</span>
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Recent Chats
          </p>

          <div className="space-y-1">
            {Object.values(chats).map((chat) => (
              <button
                key={chat.id}
                onClick={() => openChat(chat.id, chat)}
                className="w-full truncate rounded-lg px-3 py-3 text-left text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
              >
                💬 {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              Z
            </div>

            <div>
              <h3 className="text-sm font-medium">Zia-ul-Islam</h3>
              <p className="text-xs text-gray-400">
                Free Plan
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CHAT ================= */}

      <main className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between border-b border-gray-800 px-8 py-5">
          <div>
            <h2 className="text-lg font-semibold">
              New Conversation
            </h2>

            <p className="text-sm text-gray-400">
              Ask anything, I'm here to help.
            </p>
          </div>

          <button className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800">
            ⚙ Settings
          </button>
        </header>

        {/* Messages */}
        <section className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
            {messages.length === 0 && (
              <div className="mt-24 text-center">
                <div className="mb-5 text-6xl">✨</div>

                <h2 className="text-3xl font-bold">
                  How can I help you today?
                </h2>

                <p className="mt-3 text-gray-400">
                  Ask me anything and I'll do my best to help.
                </p>
              </div>
            )}

            {chats[currentChatId]?.messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${message.role === "user"
                    ? "ml-auto rounded-br-none bg-white/12 text-white"
                    : "mr-auto text-white/90"
                  }`}
              >
                {message.role === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-3 last:mb-0">
                          {children}
                        </p>
                      ),

                      h1: ({ children }) => (
                        <h1 className="mb-3 text-2xl font-bold">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="mb-2 text-xl font-semibold">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-2 text-lg font-semibold">
                          {children}
                        </h3>
                      ),

                      ul: ({ children }) => (
                        <ul className="mb-3 list-disc space-y-1 pl-5">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="mb-3 list-decimal space-y-1 pl-5">
                          {children}
                        </ol>
                      ),

                      code: ({ children }) => (
                        <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
                          {children}
                        </code>
                      ),

                      pre: ({ children }) => (
                        <pre className="mb-3 overflow-x-auto rounded-xl bg-black/40 p-4">
                          {children}
                        </pre>
                      ),

                      blockquote: ({ children }) => (
                        <blockquote className="my-3 border-l-4 border-white/40 pl-4 italic text-white/70">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Input */}
        <div className="border-t border-gray-800 bg-[#111827] p-6">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-gray-700 bg-[#1f2937] p-3"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message Perplexity AI..."
              className="flex-1 bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-700"
            >
              Send ↑
            </button>
          </form>

          <p className="mt-3 text-center text-xs text-gray-500">
            Perplexity AI can make mistakes. Check important information.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;