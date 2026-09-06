"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Check,
  Droplets,
  Flame,
  CalendarDays,
} from "lucide-react";

const DAYS = [
  { key: "Mon", label: "Пн" },
  { key: "Tue", label: "Вт" },
  { key: "Wed", label: "Ср" },
  { key: "Thu", label: "Чт" },
  { key: "Fri", label: "Пт" },
  { key: "Sat", label: "Сб" },
  { key: "Sun", label: "Вс" },
];

const INITIAL_HABITS = [
  {
    id: 1,
    title: "Медитация",
    category: "mind",
    color: "purple",
    history: {
      Mon: true,
      Tue: true,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    },
  },
  {
    id: 2,
    title: "Воркаут",
    category: "sport",
    color: "emerald",
    history: {
      Mon: true,
      Tue: false,
      Wed: true,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    },
  },
  {
    id: 3,
    title: "Здоровое питание",
    category: "health",
    color: "cyan",
    history: {
      Mon: true,
      Tue: true,
      Wed: true,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    },
  },
];

const CATEGORY_STYLES = {
  mind: {
    dot: "bg-purple-500",
    active: "bg-purple-500",
  },

  sport: {
    dot: "bg-emerald-500",
    active: "bg-emerald-500",
  },

  health: {
    dot: "bg-cyan-500",
    active: "bg-cyan-500",
  },
};

export default function HomePage() {
  const [habits, setHabits] =
    useState(INITIAL_HABITS);

  const [water, setWater] = useState(4);

  const [isAddOpen, setIsAddOpen] =
    useState(false);

  const [newHabitTitle, setNewHabitTitle] =
    useState("");

  const [newHabitCategory, setNewHabitCategory] =
    useState("mind");

  const [userName, setUserName] =
    useState("Alex");


  useEffect(() => {
    const savedName = localStorage.getItem(
      "habit-tracker-user-name"
    );

    if (savedName) {
      setUserName(savedName);
    }

    function handleNameChange(event) {
      if (event.detail) {
        setUserName(event.detail);
      }
    }

    window.addEventListener(
      "habit-name-change",
      handleNameChange
    );

    return () => {
      window.removeEventListener(
        "habit-name-change",
        handleNameChange
      );
    };
  }, []);

  const currentDate = useMemo(() => {
    const date = new Date();

    const weekday = new Intl.DateTimeFormat(
      "ru-RU",
      {
        weekday: "long",
      }
    ).format(date);

    const dayAndMonth = new Intl.DateTimeFormat(
      "ru-RU",
      {
        day: "numeric",
        month: "long",
      }
    ).format(date);

    return {
      weekday:
        weekday.charAt(0).toUpperCase() +
        weekday.slice(1),

      dayAndMonth,
    };
  }, []);

  function addHabit(event) {
    event.preventDefault();

    const title = newHabitTitle.trim();

    if (!title) {
      return;
    }

    let color = "purple";

    if (newHabitCategory === "sport") {
      color = "emerald";
    }

    if (newHabitCategory === "health") {
      color = "cyan";
    }

    const newHabit = {
      id: Date.now(),
      title,
      category: newHabitCategory,
      color,

      history: {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
      },
    };

    setHabits((current) => [
      ...current,
      newHabit,
    ]);

    setNewHabitTitle("");
    setNewHabitCategory("mind");
    setIsAddOpen(false);
  }


  function deleteHabit(id) {
    const confirmed = window.confirm(
      "Вы уверены?"
    );

    if (!confirmed) {
      return;
    }

    setHabits((current) =>
      current.filter(
        (habit) => habit.id !== id
      )
    );
  }


  function toggleHabitDay(habitId, day) {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== habitId) {
          return habit;
        }

        return {
          ...habit,

          history: {
            ...habit.history,

            [day]: !habit.history[day],
          },
        };
      })
    );
  }


  function addWater() {
    setWater((current) =>
      Math.min(current + 1, 8)
    );
  }

  function removeWater() {
    setWater((current) =>
      Math.max(current - 1, 0)
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-28 pt-5 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8 lg:pb-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
            <CalendarDays className="h-4 w-4" />

            <span>
              {currentDate.weekday},{" "}
              {currentDate.dayAndMonth}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Добро пожаловать, {userName}!
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Давайте сделаем сегодняшний день
            продуктивным.
          </p>
        </header>


        <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white shadow-sm sm:p-8">
          <div className="relative z-10 max-w-lg">
            <p className="text-sm font-medium text-indigo-100">
              Сегодня
            </p>

            <h2 className="mt-1 text-2xl font-black sm:text-3xl">
              Как твой настрой сегодня?
            </h2>

            <p className="mt-2 text-sm leading-6 text-indigo-100">
              Маленькие действия каждый день
              создают большие результаты.
            </p>
          </div>

          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />

          <div className="absolute -bottom-16 right-20 h-40 w-40 rounded-full bg-white/10" />
        </section>


        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">



          <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Habit Heatmap
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Выполнение привычек за неделю
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsAddOpen(true)
                }
                className="flex h-10 items-center gap-2 rounded-xl bg-indigo-500 px-3 text-sm font-bold text-white transition hover:bg-indigo-600 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Plus className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Добавить
                </span>
              </button>
            </div>



            <div className="mb-2 hidden items-center gap-3 px-3 sm:flex">
              <div className="flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Привычка
                </span>
              </div>

              <div className="flex gap-2">
                {DAYS.map((day) => (
                  <div
                    key={day.key}
                    className="w-8 text-center text-[10px] font-bold uppercase text-slate-400"
                  >
                    {day.label}
                  </div>
                ))}
              </div>

              <div className="w-8" />
            </div>



            <div className="space-y-3">
              {habits.map((habit) => {
                const style =
                  CATEGORY_STYLES[
                    habit.category
                  ];

                const completedCount =
                  DAYS.filter(
                    (day) =>
                      habit.history[day.key]
                  ).length;

                return (
                  <div
                    key={habit.id}
                    className="group flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-3 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:gap-3"
                  >


                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 shrink-0 rounded-full ${style.dot}`}
                        />

                        <span className="truncate text-sm font-bold text-slate-800 dark:text-white">
                          {habit.title}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                        <Flame className="h-3 w-3" />

                        {completedCount}/7
                      </div>
                    </div>



                    <div className="flex gap-1 sm:gap-2">
                      {DAYS.map((day) => {
                        const completed =
                          habit.history[
                            day.key
                          ];

                        return (
                          <button
                            key={day.key}
                            type="button"
                            aria-label={`${habit.title}: ${day.label}`}
                            onClick={() =>
                              toggleHabitDay(
                                habit.id,
                                day.key
                              )
                            }
                            className={[
                              "flex h-8 w-8 items-center justify-center rounded-lg transition active:scale-95",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",

                              completed
                                ? `${style.active} text-white`
                                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700",
                            ].join(" ")}
                          >
                            {completed && (
                              <Check className="h-4 w-4" />
                            )}
                          </button>
                        );
                      })}
                    </div>



                    <button
                      type="button"
                      title="Удалить привычку"
                      onClick={() =>
                        deleteHabit(habit.id)
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 active:scale-95 lg:opacity-0 lg:group-hover:opacity-100 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}



              {habits.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-12 text-center dark:border-slate-700">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-950/40">
                    <Plus className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-800 dark:text-white">
                    Привычек пока нет
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Добавьте первую привычку.
                  </p>
                </div>
              )}
            </div>
          </section>



          <aside>
            <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500 dark:bg-cyan-950/40">
                    <Droplets className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">
                      Вода
                    </h3>

                    <p className="text-xs text-slate-400">
                      Цель: 8 стаканов
                    </p>
                  </div>
                </div>

                <span className="text-2xl font-black text-cyan-500">
                  {water}
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-500 transition-all duration-300"
                  style={{
                    width: `${(water / 8) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={removeWater}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl font-bold text-slate-600 transition hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-white"
                >
                  −
                </button>

                <span className="text-sm text-slate-400">
                  {water}/8 стаканов
                </span>

                <button
                  type="button"
                  onClick={addWater}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-xl font-bold text-white transition hover:bg-cyan-600 active:scale-95"
                >
                  +
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>



      {isAddOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Новая привычка
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Добавьте новую привычку.
            </p>

            <form
              onSubmit={addHabit}
              className="mt-6 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Название
                </label>

                <input
                  value={newHabitTitle}
                  onChange={(e) =>
                    setNewHabitTitle(
                      e.target.value
                    )
                  }
                  placeholder="Например, Читать 20 минут"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Категория
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["mind", "Разум"],
                    ["sport", "Спорт"],
                    ["health", "Здоровье"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setNewHabitCategory(
                          value
                        )
                      }
                      className={[
                        "rounded-xl border px-2 py-3 text-sm font-semibold transition active:scale-95",

                        newHabitCategory === value
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                          : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setIsAddOpen(false)
                  }
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={
                    !newHabitTitle.trim()
                  }
                  className="flex-1 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}