import { Article, User, StatMetric, ActivityLog, CategoryStat } from '../types';

export const INITIAL_CATEGORIES = [
  'الذكاء الاصطناعي',
  'تطوير الويب',
  'الأمن السيبراني',
  'ريادة الأعمال',
  'التصميم وتجربة المستخدم',
  'البيانات السحابية',
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'مستقبل الذكاء الاصطناعي التوليدي وتأثيره على سوق العمل العربي',
    slug: 'future-of-generative-ai-arab-market',
    summary: 'نظرة تحليلية شاملة للتحولات المتسارعة التي يحدثها الذكاء الاصطناعي في بيئات العمل وتطوير المنتجات الرقمية.',
    content: 'يشهد العالم اليوم ثورة تكنولوجية كبرى تقودها نماذج الذكاء الاصطناعي التوليدي، والتي أصبحت ركيزة أساسية في تعزيز الإنتاجية وتسريع وتيرة الابتكار...',
    category: 'الذكاء الاصطناعي',
    author: {
      name: 'م. أحمد الشمري',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'كاتب تقني رئيسي',
    },
    status: 'published',
    views: 14250,
    likes: 840,
    readTime: '6 دقائق',
    publishedAt: '2026-08-28',
    updatedAt: '2026-08-29',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    tags: ['ذكاء اصطناعي', 'تقنية', 'مستقبل العمل'],
    featured: true,
  },
  {
    id: 'art-2',
    title: 'دليلك الشامل لبناء تطبيقات الويب الحديثة باستخدام React 19 و Tailwind CSS v4',
    slug: 'guide-react-19-tailwind-v4',
    summary: 'شرح عملي لأحدث ميزات React 19 والتحسينات المعمارية في إصدار Tailwind الجديد لأفضل أداء واجهات.',
    content: 'يأتي الإصدار الأحدث من React بميزات ثورية تشمل React Compiler والمحركات الحديثة للـ Server Actions وإدارة الحالة التلقائية...',
    category: 'تطوير الويب',
    author: {
      name: 'سارة المهندس',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      role: 'مطورة واجهات أمامية',
    },
    status: 'published',
    views: 22100,
    likes: 1290,
    readTime: '8 دقائق',
    publishedAt: '2026-08-25',
    updatedAt: '2026-08-25',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
    tags: ['React', 'TailwindCSS', 'برمجة', 'ويب'],
    featured: true,
  },
  {
    id: 'art-3',
    title: 'استراتيجيات الحماية السيبرانية للمؤسسات الناشئة في 2026',
    slug: 'cybersecurity-strategies-startups-2026',
    summary: 'أهم الممارسات الأمنية للحد من التهديدات الرقمية وحماية البيانات الحساسة بدون ميزانيات ضخمة.',
    content: 'مع تزايد الهجمات الإلكترونية المعقدة، أصبح لزاماً على الشركات الناشئة تبني نموذج "انعدام الثقة" (Zero Trust) وتشفير البيانات المتنقلة والساكنة...',
    category: 'الأمن السيبراني',
    author: {
      name: 'طارق العمري',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'مستشار أمن معلومات',
    },
    status: 'published',
    views: 9870,
    likes: 512,
    readTime: '5 دقائق',
    publishedAt: '2026-08-20',
    updatedAt: '2026-08-21',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    tags: ['أمن سيبراني', 'حماية البيانات', 'شركات ناشئة'],
  },
  {
    id: 'art-4',
    title: 'كيف تبني نموذج عمل مربح لمنتجات البرمجيات كخدمة (SaaS)؟',
    slug: 'building-profitable-saas-business-model',
    summary: 'خطوات عملية من تحديد القيمة السوقية إلى تسعير الاشتراكات وتقليل معدل انسحاب العملاء (Churn Rate).',
    content: 'بناء مشروع SaaS ناجح لا يعتمد فقط على جودة الكود البرمجي، بل يتطلب مواءمة دقيقة بين حل المشكلة الحقيقية وتجربة تسعير مرنة...',
    category: 'ريادة الأعمال',
    author: {
      name: 'فيصل الغامدي',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'مستشار ريادة أعمال',
    },
    status: 'draft',
    views: 0,
    likes: 0,
    readTime: '10 دقائق',
    publishedAt: '2026-08-30',
    updatedAt: '2026-08-31',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    tags: ['SaaS', 'ريادة أعمال', 'تسويق'],
  },
  {
    id: 'art-5',
    title: 'أسس التصميم الدقيق لتجربة المستخدم في التطبيقات العربية (RTL First)',
    slug: 'rtl-first-ux-ui-design-guidelines',
    summary: 'معايير بصرية ورياضية لتصميم واجهات مستخدم متناغمة تقرأ من اليمين إلى اليسار بسلاسة واحترافية.',
    content: 'تصميم الواجهات العربية يتطلب فهماً عميقاً لنسب الخطوط وحركة العين المعكوسة وتوزيع الأيقونات التوجيهية مقارنة بالنصوص...',
    category: 'التصميم وتجربة المستخدم',
    author: {
      name: 'نورة السعيد',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'مصممة واجهات رئيسية',
    },
    status: 'published',
    views: 18320,
    likes: 950,
    readTime: '7 دقائق',
    publishedAt: '2026-08-15',
    updatedAt: '2026-08-16',
    coverImage: 'https://images.unsplash.com/photo-1581291518655-9523c932deda?w=600&auto=format&fit=crop&q=80',
    tags: ['تصميم', 'UX/UI', 'RTL', 'خطوط عربية'],
    featured: true,
  },
  {
    id: 'art-6',
    title: 'مقارنة معمارية: الحوسبة السحابية متعددة الموفرين (Multi-Cloud) وإيجابياتها',
    slug: 'multi-cloud-architecture-comparison',
    summary: 'متى يجب أن توزع بنيتك التحتية على أكثر من مزود سحابي وكيفية تفادي التكاليف الخفية.',
    content: 'يوفر نموذج السحابة المتعددة أماناً ضد الانقطاعات الإقليمية ومرونة تفاوضية عالية، إلا أنه يضيف تعقيدات على مستوى التنسيق والشبكات...',
    category: 'البيانات السحابية',
    author: {
      name: 'م. أحمد الشمري',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'كاتب تقني رئيسي',
    },
    status: 'archived',
    views: 7420,
    likes: 310,
    readTime: '6 دقائق',
    publishedAt: '2026-07-10',
    updatedAt: '2026-08-01',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    tags: ['سحابة', 'DevOps', 'بنية تحتية'],
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-1',
    name: 'عبدالرحمن باجبير',
    email: 'admin@platform.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    articlesCount: 14,
    joinedAt: '2025-01-15',
    lastActive: 'منذ 5 دقائق',
    bio: 'مدير عام المنصة والمشرف التقني على جودة المحتوى الرقمي.',
  },
  {
    id: 'user-2',
    name: 'م. أحمد الشمري',
    email: 'ahmed.shammari@platform.com',
    role: 'editor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    articlesCount: 32,
    joinedAt: '2025-03-20',
    lastActive: 'منذ ساعتين',
    bio: 'محرر تقني خبير في مجالات الذكاء الاصطناعي والحوسبة السحابية.',
  },
  {
    id: 'user-3',
    name: 'سارة المهندس',
    email: 'sara.engineer@platform.com',
    role: 'author',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    articlesCount: 19,
    joinedAt: '2025-05-12',
    lastActive: 'منذ يوم',
    bio: 'مهندسة برمجيات متخصصة في منظومة جافاسكريبت والأنظمة التفاعلية.',
  },
  {
    id: 'user-4',
    name: 'طارق العمري',
    email: 'tariq.omari@platform.com',
    role: 'author',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    articlesCount: 8,
    joinedAt: '2025-09-01',
    lastActive: 'منذ 3 أيام',
    bio: 'باحث ومستشار في اختبار الاختراق وأمن الشبكات المؤسسية.',
  },
  {
    id: 'user-5',
    name: 'نورة السعيد',
    email: 'noura.saeed@platform.com',
    role: 'editor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    articlesCount: 24,
    joinedAt: '2025-02-18',
    lastActive: 'منذ 4 ساعات',
    bio: 'قائدة فريق التصميم وتجربة المستخدم وتطوير الهويات الرقمية.',
  },
  {
    id: 'user-6',
    name: 'خالد المنصور',
    email: 'khaled.m@platform.com',
    role: 'subscriber',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    articlesCount: 0,
    joinedAt: '2026-08-30',
    lastActive: 'منذ ساعة',
    bio: 'مهتم بالتقنية وقارئ دائم لمقالات المنصة.',
  },
  {
    id: 'user-7',
    name: 'ياسر القحطاني',
    email: 'yasser.q@platform.com',
    role: 'author',
    status: 'suspended',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    articlesCount: 3,
    joinedAt: '2025-11-10',
    lastActive: 'منذ أسبوعين',
    bio: 'كاتب سابق تم تعليق حسابه لمراجعة معايير النشر.',
  },
];

export const INITIAL_STATS: StatMetric[] = [
  {
    id: 'stat-articles',
    title: 'إجمالي المقالات',
    value: '1,428',
    rawNumber: 1428,
    change: '+14.2%',
    isPositive: true,
    period: 'مقارنة بالشهر الماضي',
    iconName: 'file-text',
    color: 'emerald',
    sparkline: [35, 42, 48, 55, 53, 62, 70, 78, 85, 94],
  },
  {
    id: 'stat-views',
    title: 'إجمالي المشاهدات',
    value: '384.5K',
    rawNumber: 384500,
    change: '+28.6%',
    isPositive: true,
    period: 'مقارنة بالأسبوع السابق',
    iconName: 'eye',
    color: 'indigo',
    sparkline: [120, 140, 190, 220, 210, 280, 310, 340, 360, 384],
  },
  {
    id: 'stat-users',
    title: 'المستخدمين النشطين',
    value: '8,920',
    rawNumber: 8920,
    change: '+8.4%',
    isPositive: true,
    period: 'خلال آخر 30 يوماً',
    iconName: 'users',
    color: 'sky',
    sparkline: [40, 45, 52, 58, 65, 62, 71, 79, 82, 89],
  },
  {
    id: 'stat-engagement',
    title: 'معدل التفاعل والقراءة',
    value: '76.8%',
    rawNumber: 76.8,
    change: '+3.9%',
    isPositive: true,
    period: 'متوسط وقت القراءة 5.2 دقيقة',
    iconName: 'trending-up',
    color: 'amber',
    sparkline: [62, 65, 68, 67, 72, 70, 74, 73, 75, 77],
  },
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    user: 'م. أحمد الشمري',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'نشر مقال جديد',
    target: 'مستقبل الذكاء الاصطناعي التوليدي وتأثيره',
    timestamp: 'منذ 25 دقيقة',
    type: 'publish',
  },
  {
    id: 'act-2',
    user: 'سارة المهندس',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    action: 'تحديث محتوى مقال',
    target: 'دليلك الشامل لبناء تطبيقات React 19',
    timestamp: 'منذ ساعتين',
    type: 'update',
  },
  {
    id: 'act-3',
    user: 'عبدالرحمن باجبير',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    action: 'ترقية صلاحية مستخدم إلى محرر',
    target: 'نورة السعيد',
    timestamp: 'منذ 5 ساعات',
    type: 'user',
  },
  {
    id: 'act-4',
    user: 'فيصل الغامدي',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    action: 'حفظ مسودة جديدة',
    target: 'كيف تبني نموذج عمل مربح لمنتجات SaaS',
    timestamp: 'منذ يوم',
    type: 'create',
  },
  {
    id: 'act-5',
    user: 'طارق العمري',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    action: 'أرشفة مقال قديم',
    target: 'مقارنة معمارية: الحوسبة السحابية',
    timestamp: 'منذ يومين',
    type: 'delete',
  },
];

export const CATEGORIES_STATS: CategoryStat[] = [
  { name: 'الذكاء الاصطناعي', count: 420, percentage: 35, color: '#6366f1', icon: 'Bot' },
  { name: 'تطوير الويب', count: 350, percentage: 28, color: '#38bdf8', icon: 'Code' },
  { name: 'الأمن السيبراني', count: 210, percentage: 16, color: '#10b981', icon: 'Shield' },
  { name: 'التصميم وتجربة المستخدم', count: 180, percentage: 12, color: '#f59e0b', icon: 'Palette' },
  { name: 'ريادة الأعمال', count: 140, percentage: 9, color: '#ec4899', icon: 'Briefcase' },
];

// Helper functions for Local Storage Persistence
export const loadStoredArticles = (): Article[] => {
  try {
    const data = localStorage.getItem('admin_dashboard_articles');
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_ARTICLES;
};

export const saveStoredArticles = (articles: Article[]) => {
  try {
    localStorage.setItem('admin_dashboard_articles', JSON.stringify(articles));
  } catch (e) {
    console.error(e);
  }
};

export const loadStoredUsers = (): User[] => {
  try {
    const data = localStorage.getItem('admin_dashboard_users');
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_USERS;
};

export const saveStoredUsers = (users: User[]) => {
  try {
    localStorage.setItem('admin_dashboard_users', JSON.stringify(users));
  } catch (e) {
    console.error(e);
  }
};

export const loadStoredActivities = (): ActivityLog[] => {
  try {
    const data = localStorage.getItem('admin_dashboard_activities');
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_ACTIVITIES;
};

export const saveStoredActivities = (activities: ActivityLog[]) => {
  try {
    localStorage.setItem('admin_dashboard_activities', JSON.stringify(activities));
  } catch (e) {
    console.error(e);
  }
};
