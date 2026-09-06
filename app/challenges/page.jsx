import {
    Activity,
    Flame,
    Sparkles,
    Trophy,
  } from "lucide-react";
  
  const challenges = [
    {
      id: 1,
      title: "7 дней без сахара",
      description:
        "Откажитесь от добавленного сахара на протяжении недели.",
      progress: 4,
      target: 7,
      color: "orange",
      icon: Flame,
    },
    {
      id: 2,
      title: "10к шагов ежедневно",
      description:
        "Достигайте цели в 10 000 шагов каждый день.",
      progress: 12,
      target: 30,
      color: "emerald",
      icon: Activity,
    },
    {
      id: 3,
      title: "Неделя медитации",
      description:
        "Медитируйте минимум 10 минут каждый день.",
      progress: 5,
      target: 7,
      color: "purple",
      icon: Sparkles,
    },
  ];
  
  export default function ChallengesPage() {
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <header>
            <p className="text-sm font-medium text-slate-400">
              Keep going
            </p>
  
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Челленджи
            </h1>
  
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Долгосрочные цели помогают превратить маленькие
              действия в устойчивые привычки.
            </p>
          </header>
  
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              const progress =
                (challenge.progress / challenge.target) * 100;
  
              const iconColor =
                challenge.color === "orange"
                  ? "bg-orange-50 text-orange-500"
                  : challenge.color === "emerald"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-purple-50 text-purple-500";
  
              const progressColor =
                challenge.color === "orange"
                  ? "bg-orange-500"
                  : challenge.color === "emerald"
                    ? "bg-emerald-500"
                    : "bg-purple-500";
  
              return (
                <article
                  key={challenge.id}
                  className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconColor}`}
                    >
                      <Icon size={23} />
                    </div>
  
                    <div>
                      <h2 className="font-bold text-slate-900">
                        {challenge.title}
                      </h2>
  
                      <p className="mt-1 text-sm leading-5 text-slate-400">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
  
                  <div className="mt-7">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-400">
                        Прогресс
                      </span>
  
                      <span className="font-bold text-slate-700">
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
  
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${progressColor}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
  
                    <p className="mt-3 text-xs font-medium text-slate-400">
                      {Math.round(progress)}% выполнено
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
  
          <section className="mt-5 rounded-3xl bg-slate-900 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Trophy size={24} />
              </div>
  
              <div>
                <h2 className="font-bold">
                  Продолжайте в том же духе!
                </h2>
  
                <p className="mt-1 text-sm text-slate-400">
                  Выполнено 21 день в рамках текущих челленджей.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }