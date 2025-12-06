import { Domain, Question } from './types';

export const TOTAL_STEPS = 24; // A focused set of questions for high-quality analysis

export const QUESTIONS: Question[] = [
  // Executing (执行力)
  { id: 1, text: "我天生善于组织人力和资源以达到最高效率。", domainHint: Domain.EXECUTING },
  { id: 2, text: "每当完成待办事项清单上的任务时，我会感到深深的满足感。", domainHint: Domain.EXECUTING },
  { id: 3, text: "我非常谨慎，时刻保持警惕以防患于未然。", domainHint: Domain.EXECUTING },
  { id: 4, text: "一旦我做出承诺，无论遇到何种阻碍，我都会贯彻到底。", domainHint: Domain.EXECUTING },
  { id: 5, text: "我倾向于对所有人一视同仁，以确保公平和一致性。", domainHint: Domain.EXECUTING },
  { id: 6, text: "我由一套稳固且极少改变的核心价值观所驱动。", domainHint: Domain.EXECUTING },

  // Influencing (影响力)
  { id: 7, text: "我喜欢掌控局面，在他人犹豫不决时果断做出决策。", domainHint: Domain.INFLUENCING },
  { id: 8, text: "我享受成为众人瞩目的焦点，并喜欢赢得他人的喜爱。", domainHint: Domain.INFLUENCING },
  { id: 9, text: "我希望我的工作被公认为重要、独特且意义非凡。", domainHint: Domain.INFLUENCING },
  { id: 10, text: "我经常将自己的表现与他人比较，看自己是否处于领先地位。", domainHint: Domain.INFLUENCING },
  { id: 11, text: "我能轻易说服他人接受我的观点。", domainHint: Domain.INFLUENCING },
  { id: 12, text: "我天生就能激励团队，让大家对项目充满热情。", domainHint: Domain.INFLUENCING },

  // Relationship Building (关系建立)
  { id: 13, text: "即使对方什么都不说，我也能敏锐地感知到他们的情绪。", domainHint: Domain.RELATIONSHIP_BUILDING },
  { id: 14, text: "我享受将不同背景和观点的人聚集在一起的过程。", domainHint: Domain.RELATIONSHIP_BUILDING },
  { id: 15, text: "相比拥有广泛的泛泛之交，我更喜欢深度的一对一关系。", domainHint: Domain.RELATIONSHIP_BUILDING },
  { id: 16, text: "我能看到每个人身上的潜力，并乐于帮助他们成长。", domainHint: Domain.RELATIONSHIP_BUILDING },
  { id: 17, text: "我努力消除冲突，帮助他人寻找共同点以达成和解。", domainHint: Domain.RELATIONSHIP_BUILDING },
  { id: 18, text: "我经常思考我的团队或群体如何融合并相互支持。", domainHint: Domain.RELATIONSHIP_BUILDING },

  // Strategic Thinking (战略思维)
  { id: 19, text: "我对未来和“可能发生的事情”感到着迷。", domainHint: Domain.STRATEGIC_THINKING },
  { id: 20, text: "我喜欢搜集各种信息和知识，即使目前没有立即的用途。", domainHint: Domain.STRATEGIC_THINKING },
  { id: 21, text: "我享受复杂的脑力活动和深度的智力探讨。", domainHint: Domain.STRATEGIC_THINKING },
  { id: 22, text: "我天生就能发现他人容易错过的规律、模式和数据间的联系。", domainHint: Domain.STRATEGIC_THINKING },
  { id: 23, text: "对于任何给定的情况，我通常都有B计划、C计划甚至D计划。", domainHint: Domain.STRATEGIC_THINKING },
  { id: 24, text: "在采取行动之前，我会花时间深思熟虑。", domainHint: Domain.STRATEGIC_THINKING },
];

export const DOMAIN_LABELS = {
  [Domain.EXECUTING]: "执行力",
  [Domain.INFLUENCING]: "影响力",
  [Domain.RELATIONSHIP_BUILDING]: "关系建立",
  [Domain.STRATEGIC_THINKING]: "战略思维",
};

export const DOMAIN_COLORS = {
  [Domain.EXECUTING]: "bg-purple-100 text-purple-800 border-purple-200",
  [Domain.INFLUENCING]: "bg-orange-100 text-orange-800 border-orange-200",
  [Domain.RELATIONSHIP_BUILDING]: "bg-blue-100 text-blue-800 border-blue-200",
  [Domain.STRATEGIC_THINKING]: "bg-green-100 text-green-800 border-green-200",
};

export const DOMAIN_BG = {
  [Domain.EXECUTING]: "#a855f7",
  [Domain.INFLUENCING]: "#f97316",
  [Domain.RELATIONSHIP_BUILDING]: "#3b82f6",
  [Domain.STRATEGIC_THINKING]: "#22c55e",
};