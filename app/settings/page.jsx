"use client";

import { useState } from "react";
import {
  User,
  Save,
  RotateCcw,
} from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("Alex");
  const [saved, setSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);

  function saveName() {
    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    localStorage.setItem(
      "habit-tracker-user-name",
      cleanName
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  function resetAllData() {
    localStorage.removeItem(
      "habit-tracker-user-name"
    );

    localStorage.removeItem(
      "habit-tracker-habits"
    );

    localStorage.removeItem(
      "habit-tracker-water"
    );

    setName("Alex");
    setShowReset(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 pb-28 pt-6 text-slate-100 sm:px-6 lg:px-8 lg:pb-8">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-sm font-bold text-indigo-400">
            Настройки
          </p>

          <h1 className="mt-1 text-3xl font-black tracking-tight text-white">
            Настройки приложения
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Управляйте профилем и данными
            Habit Tracker.
          </p>
        </div>

        <div className="space-y-6">

          {/* PROFILE */}

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-950/50 text-indigo-400">
                <User className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-black text-white">
                  Профиль
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Измените имя пользователя,
                  отображаемое в приложении.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Ваше имя
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Введите имя"
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <button
                  type="button"
                  onClick={saveName}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Save className="h-4 w-4" />

                  {saved
                    ? "Сохранено"
                    : "Сохранить"}
                </button>
              </div>
            </div>
          </section>

          {/* DANGER ZONE */}

          <section className="rounded-3xl border border-red-950 bg-zinc-900 p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-950/50 text-red-400">
                <RotateCcw className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-black text-red-400">
                  Опасная зона
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Здесь можно полностью очистить
                  сохраненные данные приложения.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowReset(true)
                  }
                  className="mt-5 rounded-xl border border-red-900 px-4 py-3 text-sm font-bold text-red-400 transition hover:bg-red-950/40 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  Сбросить все данные
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>


      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <h2 className="text-xl font-black text-white">
              Сбросить все данные?
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Будут удалены сохраненные привычки,
              история, счетчик воды и имя
              пользователя.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowReset(false)
                }
                className="flex-1 rounded-xl border border-zinc-700 px-4 py-3 text-sm font-bold text-zinc-300 transition hover:bg-zinc-800 active:scale-95"
              >
                Отмена
              </button>

              <button
                type="button"
                onClick={resetAllData}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600 active:scale-95"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}