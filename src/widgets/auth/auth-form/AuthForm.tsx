"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"

export type AuthMode = "login" | "register"

interface AuthFormProps {
    mode: AuthMode
}

export default function AuthForm({ mode }: AuthFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState("")
    const isRegister = mode === "register"

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (isRegister) {
            const formData = new FormData(event.currentTarget)
            if (formData.get("password") !== formData.get("confirmPassword")) {
                setMessage("Пароли не совпадают.")
                return
            }
        }

        setMessage("Форма готова, но сервис авторизации пока не подключён.")
    }

    return (
        <main className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center bg-zinc-900 px-4 py-12 pt-24 sm:px-6">
            <section className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-800/80 p-6 shadow-2xl shadow-black/20 sm:p-8">
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
                        <ShieldCheck size={24} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                        VAG Forum
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                        {isRegister ? "Создать аккаунт" : "С возвращением"}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {isRegister
                            ? "Присоединяйтесь к сообществу владельцев VAG."
                            : "Войдите, чтобы продолжить общение в сообществе."}
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {isRegister && (
                        <div>
                            <label htmlFor="auth-name" className="mb-2 block text-sm font-medium text-zinc-200">
                                Имя пользователя
                            </label>
                            <input
                                id="auth-name"
                                name="name"
                                type="text"
                                autoComplete="username"
                                required
                                minLength={2}
                                maxLength={40}
                                placeholder="Например, vag_owner"
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="auth-email" className="mb-2 block text-sm font-medium text-zinc-200">
                            Электронная почта
                        </label>
                        <input
                            id="auth-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            maxLength={254}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div>
                        <label htmlFor="auth-password" className="mb-2 block text-sm font-medium text-zinc-200">
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                id="auth-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete={isRegister ? "new-password" : "current-password"}
                                required
                                minLength={8}
                                maxLength={128}
                                onChange={() => setMessage("")}
                                placeholder="Не менее 8 символов"
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                aria-pressed={showPassword}
                                onClick={() => setShowPassword((visible) => !visible)}
                                className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center text-zinc-400 transition hover:text-white"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {isRegister && (
                        <div>
                            <label htmlFor="auth-confirm-password" className="mb-2 block text-sm font-medium text-zinc-200">
                                Повторите пароль
                            </label>
                            <input
                                id="auth-confirm-password"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                minLength={8}
                                maxLength={128}
                                onChange={() => setMessage("")}
                                placeholder="Введите пароль ещё раз"
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                    )}

                    {isRegister && (
                        <label className="flex items-start gap-3 text-sm leading-5 text-zinc-400">
                            <input
                                type="checkbox"
                                required
                                className="mt-1 size-4 rounded border-zinc-600 bg-zinc-900 accent-blue-500"
                            />
                            <span>Я согласен(на) с правилами сообщества и обработкой данных.</span>
                        </label>
                    )}

                    {message && (
                        <p role="status" className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800"
                    >
                        {isRegister ? "Зарегистрироваться" : "Войти"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    {isRegister ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}{" "}
                    <Link
                        href={isRegister ? "/login" : "/register"}
                        className="font-semibold text-blue-400 transition hover:text-blue-300"
                    >
                        {isRegister ? "Войти" : "Зарегистрироваться"}
                    </Link>
                </p>
            </section>
        </main>
    )
}
