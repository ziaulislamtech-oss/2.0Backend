import React from 'react'
import useAuth from '../hook/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'

const Protected = ({ children }) => {

    const { loading, user } = useAuth()

    const navigate = useNavigate()
    console.log(user)

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] relative overflow-hidden">

                {/* Background Blobs */}
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[180px]" />
                <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[200px]" />

                {/* Loader Card */}
                <div className="relative z-10 flex flex-col items-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-12 py-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,.35)]">

                    {/* Spinner */}
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />

                    <h2 className="mt-8 font-space-grotesk text-2xl font-bold text-[var(--text)]">
                        Loading Moodify
                    </h2>

                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                        Preparing your experience...
                    </p>

                </div>

            </div>
        );
    }
    if (!user) {
        return <Navigate to={'/login'} replace />
    }



    return children
}

export default Protected
