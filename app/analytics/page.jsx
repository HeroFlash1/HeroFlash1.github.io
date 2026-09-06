"use client";

import { useMemo } from "react";
import {
  CheckCircle2,
  Target,
  Flame,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const DAYS = [
  { key: "Mon", label: "Mon" },
  { key: "Tue", label: "Tue" },
  { key: "Wed", label: "Wed" },
  { key: "Thu", label: "Thu" },
  { key: "Fri", label: "Fri" },
  { key: "Sat", label: "Sat" },
  { key: "Sun", label: "Sun" },
];

const HABITS = [
  {
    id: 1,
    title: "Медитация",
    history: {
      Mon: true,
      Tue: true,
      Wed: false,
      Thu: true,
      Fri: false,
      Sat: false,
      Sun: false,
    },
  },
  {
    id: 2,
    title: "Воркаут",
    history: {
      Mon: true,
      Tue: false,
      Wed: true,
      Thu: true,
      Fri: true,
      Sat: false,
      Sun: false,
    },
  },
  {
    id: 3,
    title: "Здоровое питание",
    history: {
      Mon: true,
      Tue: true,
      Wed: true,
      Thu: false,
      Fri: true,
      Sat: true,
      Sun: false,
    },
  },
];

export default function AnalyticsPage() {
  const habits = HABITS;

  const statistics = useMemo(() => {
    let totalCompleted = 0;

    habits.forEach((habit) => {
      DAYS.forEach((day) => {
        if (habit.history[day.key]) {
          totalCompleted += 1;
        }
      });
    });

    const totalPossible =
      habits.length * DAYS.length;

    const successRate =
      totalPossible > 0
        ? Math.round(
            (totalCompleted / totalPossible) * 100
          )
        : 0;

    return {
      totalCompleted,
      successRate,
      activeHabits: habits.length,
    };
  }, []);

  const dailyActivity = useMemo(() => {
    return DAYS.map((day) => {
      const count = habits.reduce(
        (total, habit) =>
          total +
          (habit.history[day.key] ? 1 : 0),
        0
      );

      return {
        ...day,
        count,
      };
    });
  }, []);

  const maxActivity = Math.max(
    ...dailyActivity.map(
      (day) => day.count
    ),
    1
  );

  return (
    <main className="min-h-screen bg-zinc-950 px-4 pb-28 pt-6 text-slate-100 sm:px-6 lg:px-8 lg:pb-8">
      <div className="mx-auto max-w-7xl">

        

        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-400">
            <BarChart3 className="h-5 w-5" />

            <span className="text-sm font-bold">
              Аналитика
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
            Ваш прогресс
          </h1>

          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Анализ выполнения привычек за текущую
            неделю.
          </p>
        </div>

        

        <div className="grid gap-4 sm:grid-cols-3">

          

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-950/50 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <span className="text-xs font-bold text-emerald-400">
                Выполнено
              </span>
            </div>

            <p className="mt-5 text-sm text-zinc-400">
              Всего выполнений
            </p>

            <p className="mt-1 text-3xl font-black text-white">
              {statistics.totalCompleted}
            </p>
          </div>

   

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-950/50 text-indigo-400">
                <Target className="h-5 w-5" />
              </div>

              <TrendingUp className="h-4 w-4 text-indigo-400" />
            </div>

            <p className="mt-5 text-sm text-zinc-400">
              Индекс успеха
            </p>

            <p className="mt-1 text-3xl font-black text-white">
              {statistics.successRate}%
            </p>
          </div>



          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-950/50 text-purple-400">
                <Flame className="h-5 w-5" />
              </div>

              <span className="text-xs font-bold text-purple-400">
                Active
              </span>
            </div>

            <p className="mt-5 text-sm text-zinc-400">
              Активные привычки
            </p>

            <p className="mt-1 text-3xl font-black text-white">
              {statistics.activeHabits}
            </p>
          </div>
        </div>



        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-white shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">
                Активность по дням
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Количество выполненных привычек
              </p>
            </div>

            <div className="rounded-xl bg-zinc-800 px-3 py-2 text-xs font-bold text-zinc-300">
              7 дней
            </div>
          </div>

          <div className="mt-8 flex h-64 items-end justify-between gap-2 sm:gap-4">
            {dailyActivity.map((day) => {
              const height =
                day.count === 0
                  ? 8
                  : Math.max(
                      (day.count /
                        maxActivity) *
                        100,
                      15
                    );

              return (
                <div
                  key={day.key}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <span className="text-xs font-bold text-zinc-300">
                    {day.count}
                  </span>

                  <div className="flex h-full w-full items-end justify-center">
                    <div
                      className={
                        day.count === 0
                          ? "w-full max-w-10 rounded-t-xl bg-zinc-800"
                          : "w-full max-w-10 rounded-t-xl bg-indigo-500 transition-all hover:bg-indigo-400"
                      }
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>

                  <span className="text-[11px] font-bold text-zinc-500">
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>



        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-white shadow-sm sm:p-6">
          <h2 className="text-lg font-black text-white">
            Прогресс привычек
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Результаты за последние 7 дней.
          </p>

          <div className="mt-6 space-y-5">
            {habits.map((habit) => {
              const completed = DAYS.filter(
                (day) =>
                  habit.history[day.key]
              ).length;

              const percentage = Math.round(
                (completed / 7) * 100
              );

              return (
                <div key={habit.id}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-200">
                      {habit.title}
                    </span>

                    <span className="text-xs font-bold text-zinc-500">
                      {completed}/7
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-sm">
          <div className="relative z-10">
            <p className="text-sm font-semibold text-indigo-200">
              Ваш результат
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Продолжайте в том же духе!
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100">
              Регулярность важнее идеального
              результата. Каждый выполненный день
              приближает вас к цели.
            </p>
          </div>

          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

          <div className="absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-white/10" />
        </section>
      </div>
    </main>
  );
}