"use client";

import {
  AlertCircle,
  CalendarDays,
  Check,
  CirclePlus,
  RefreshCw,
  Trash2,
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

const COLOR_STYLES = {
  purple: {
    active: "bg-purple-500 border-purple-500",
    dot: "bg-purple-500",
  },
  emerald: {
    active: "bg-emerald-500 border-emerald-500",
    dot: "bg-emerald-500",
  },
  cyan: {
    active: "bg-cyan-500 border-cyan-500",
    dot: "bg-cyan-500",
  },
};

export default function HabitHeatmap({
  habits,
  onToggle,
  onDelete,
}) {
  if (habits.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>

      <div className="mb-4 flex items-center gap-2 rounded-2xl bg-slate-50 p-3 lg:hidden">
        <CalendarDays
          size={17}
          className="text-slate-400"
        />

        <div className="flex flex-1 justify-between">
          {DAYS.map((day) => (
            <span
              key={day.key}
              className="w-7 text-center text-[10px] font-semibold text-slate-400"
            >
              {day.label}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-[minmax(180px,1fr)_repeat(7,36px)_32px] items-center gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-semibold text-slate-400">
            Привычка
          </span>

          {DAYS.map((day) => (
            <span
              key={day.key}
              className="text-center text-xs font-semibold text-slate-400"
            >
              {day.label}
            </span>
          ))}

          <span />
        </div>

        <div className="divide-y divide-slate-100">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>

     
      <div className="space-y-3 lg:hidden">
        {habits.map((habit) => (
          <MobileHabitRow
            key={habit.id}
            habit={habit}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

function HabitRow({
  habit,
  onToggle,
  onDelete,
}) {
  const color =
    COLOR_STYLES[habit.color] ||
    COLOR_STYLES.purple;

  return (
    <div className="group grid grid-cols-[minmax(180px,1fr)_repeat(7,36px)_32px] items-center gap-2 py-4">
      {/* Habit name */}
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${color.dot}`}
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-700">
            {habit.title}
          </p>

          <p className="mt-0.5 text-[11px] text-slate-400">
            {getCategoryName(habit.category)}
          </p>
        </div>
      </div>


      {DAYS.map((day) => (
        <DayButton
          key={day.key}
          active={habit.history[day.key]}
          color={habit.color}
          label={`${habit.title}: ${day.label}`}
          onClick={() =>
            onToggle(habit.id, day.key)
          }
        />
      ))}


      <DeleteButton
        habit={habit}
        onDelete={onDelete}
      />
    </div>
  );
}

function MobileHabitRow({
  habit,
  onToggle,
  onDelete,
}) {
  const color =
    COLOR_STYLES[habit.color] ||
    COLOR_STYLES.purple;

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${color.dot}`}
          />

          <span className="truncate text-sm font-semibold text-slate-700">
            {habit.title}
          </span>
        </div>


        <DeleteButton
          habit={habit}
          onDelete={onDelete}
          mobile
        />
      </div>

      <div className="flex justify-between gap-1">
        {DAYS.map((day) => (
          <div
            key={day.key}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[9px] font-medium text-slate-400">
              {day.label}
            </span>

            <DayButton
              active={habit.history[day.key]}
              color={habit.color}
              label={`${habit.title}: ${day.label}`}
              onClick={() =>
                onToggle(habit.id, day.key)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DeleteButton({
  habit,
  onDelete,
  mobile = false,
}) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Вы уверены?"
    );

    if (!confirmed) {
      return;
    }

    onDelete(habit.id);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      aria-label={`Удалить привычку ${habit.title}`}
      title="Удалить привычку"
      className={[
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition",
        "hover:bg-red-50 hover:text-red-500",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
        mobile
          ? "opacity-100"
          : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
      ].join(" ")}
    >
      <Trash2 size={16} />
    </button>
  );
}

function DayButton({
  active,
  color,
  label,
  onClick,
}) {
  const colorStyle =
    COLOR_STYLES[color]?.active ||
    COLOR_STYLES.purple.active;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={[
        "group relative flex h-7 w-7 items-center justify-center rounded-lg border transition-all",
        "active:scale-90 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        active
          ? `${colorStyle} shadow-sm`
          : "border-transparent bg-slate-100 hover:bg-slate-200",
      ].join(" ")}
    >
      {active && (
        <Check
          size={13}
          strokeWidth={3}
          className="text-white"
        />
      )}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
        <CalendarDays size={25} />
      </div>

      <h3 className="mt-4 font-bold text-slate-800">
        Привычек пока нет
      </h3>

      <p className="mt-1 max-w-xs text-sm leading-5 text-slate-400">
        Добавьте первую привычку, чтобы начать
        отслеживать свой прогресс.
      </p>

      <button
        type="button"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <CirclePlus size={17} />
        Добавить привычку
      </button>
    </div>
  );
}

function getCategoryName(category) {
  const names = {
    sport: "Спорт",
    health: "Здоровье",
    mind: "Разум / Медитация",
  };

  return names[category] || "Другое";
}