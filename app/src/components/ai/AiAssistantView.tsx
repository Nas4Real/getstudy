import { Dialog } from '../common/Dialog';
import React, { useState, useRef, useEffect } from 'react';
import type { TaskData, SessionData } from '../../types';
import { LatexMath } from '../common/LatexMath';

interface ActionItem {
  type: 'task' | 'session';
  title: string;
  subject: string;
  dueDate?: string;
  date?: string;
  time?: string;
}

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  attachments?: AttachedFile[];
  subject?: string;
  actionExecuted?: {
    type: 'tasks_added' | 'session_scheduled';
    title: string;
    items: ActionItem[];
  };
  formula?: string;
  keyPoints?: string[];
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  subject: string;
  dateGroup: 'Today' | 'Yesterday' | 'Previous 7 Days';
  timestamp: string;
  messages: Message[];
}

export type AiMockState = 'normal' | 'empty' | 'typing' | 'action' | 'search-empty';

export interface AiAssistantViewProps {
  onAddTasks?: (tasks: TaskData[]) => void;
  onAddSession?: (session: SessionData) => void;
  onNavigateToTasks?: () => void;
  onNavigateToCalendar?: () => void;
  onOpenNewTaskModal?: () => void;
  onOpenNewSessionModal?: () => void;
  mockTyping?: boolean;
  mockState?: AiMockState;
  onShowToast?: (msg: string) => void;
}

const DRAFT_BLANK_CONVERSATION: Conversation = {
  id: 'draft-blank',
  title: 'New Conversation',
  preview: 'Ask your assistant to add tasks or schedule sessions...',
  subject: 'General',
  dateGroup: 'Today',
  timestamp: 'Just now',
  messages: [],
};

const ACTION_DEMO_CONVERSATION: Conversation = {
  id: 'conv-action',
  title: "Tomorrow's Tasks Setup",
  preview: 'Added 2 tasks: Chapter 4 exercises & Physics notes...',
  subject: 'Tasks & Planning',
  dateGroup: 'Today',
  timestamp: '10:02 AM',
  messages: [
    {
      id: 'msg-action-1',
      sender: 'ai',
      text: "Hello Jane! I'm your GetStudy AI Assistant. I can organize your tasks, schedule study sessions into your calendar, plan your exam revisions, and answer academic questions.\n\nTry telling me: \"I have 2 tasks to do tomorrow: Finish Physics problem set and Read Chapter 4 of Math\"",
      timestamp: '10:00 AM',
    },
    {
      id: 'msg-action-2',
      sender: 'user',
      text: 'I have 2 tasks to do tomorrow: Complete Chapter 4 exercises and Review Physics notes.',
      timestamp: '10:01 AM',
    },
    {
      id: 'msg-action-3',
      sender: 'ai',
      text: "Understood! I've extracted the tasks and added them directly to your workspace.",
      actionExecuted: {
        type: 'tasks_added',
        title: 'Added 2 tasks to your workspace',
        items: [
          {
            type: 'task',
            title: 'Complete Chapter 4 Exercises',
            subject: 'Math',
            dueDate: 'Tomorrow',
          },
          {
            type: 'task',
            title: 'Review Physics Notes',
            subject: 'Physics',
            dueDate: 'Tomorrow',
          },
        ],
      },
      keyPoints: [
        'Due Date: Set to Tomorrow (Vendredi 8 Mai)',
        'Priorities: High & Medium assigned based on your course syllabus',
        'You can view and check them off anytime in the Tasks tab or on your Overview Dashboard.',
      ],
      timestamp: '10:02 AM',
    },
  ],
};

export const parseAiMockStateFromUrl = (propMockTyping?: boolean): AiMockState => {
  if (propMockTyping) return 'typing';
  if (typeof window === 'undefined') return 'normal';
  const p = new URLSearchParams(window.location.search);
  const s = (p.get('ai') || p.get('chat') || p.get('assistant') || '').toLowerCase();
  if (s === 'empty' || s === '0' || s === 'none' || s === 'new' || s === 'blank') return 'empty';
  if (s === 'typing' || s === 'stream' || s === 'generating') return 'typing';
  if (s === 'action' || s === 'tasks' || s === 'session') return 'action';
  if (s === 'search-empty' || s === 'no-results') return 'search-empty';
  if (p.get('state') === 'ai-typing') return 'typing';
  return 'normal';
};

export const parseActiveConvIdFromUrl = (mockState: AiMockState): string => {
  if (mockState === 'empty') return 'draft-blank';
  if (mockState === 'action') return 'conv-action';
  if (typeof window === 'undefined') return 'conv-1';
  const p = new URLSearchParams(window.location.search);
  const conv = (p.get('chat') || p.get('conv') || p.get('ai') || '').toLowerCase();
  if (conv === 'conv-2' || conv === 'algebre' || conv === 'matrix') return 'conv-2';
  if (conv === 'conv-3' || conv === 'physics' || conv === 'thermo') return 'conv-3';
  if (conv === 'conv-4' || conv === 'analyse' || conv === 'calculus') return 'conv-4';
  if (conv === 'conv-5' || conv === 'schedule' || conv === 'plan') return 'conv-5';
  if (conv === 'conv-action') return 'conv-action';
  if (conv === 'conv-1') return 'conv-1';
  return 'conv-1';
};

export const parseSearchHistoryFromUrl = (mockState: AiMockState): string => {
  if (mockState === 'search-empty') return 'Quantum Gravitation';
  if (typeof window === 'undefined') return '';
  const p = new URLSearchParams(window.location.search);
  return p.get('q') || p.get('search') || '';
};

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: "Tomorrow's Tasks Setup",
    preview: 'Added 2 tasks: Chapter 4 exercises & Physics notes...',
    subject: 'Tasks & Planning',
    dateGroup: 'Today',
    timestamp: '10:00 AM',
    messages: [
      {
        id: 'msg-1',
        sender: 'ai',
        text: "Hello Jane! I'm your GetStudy AI Assistant. I can organize your tasks, schedule study sessions into your calendar, plan your exam revisions, and answer academic questions.\n\nTry telling me: \"I have 2 tasks to do tomorrow: Finish Physics problem set and Read Chapter 4 of Math\"",
        timestamp: '10:00 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'Algèbre Linéaire Exam Prep',
    preview: 'Matrix diagonalization theorems and characteristic polynomial...',
    subject: 'Algèbre',
    dateGroup: 'Today',
    timestamp: '08:45 AM',
    messages: [
      {
        id: 'c2-1',
        sender: 'user',
        text: 'Summarize key formulas and diagonalization theorems for my exam in 2 days.',
        timestamp: '08:44 AM',
      },
      {
        id: 'c2-2',
        sender: 'ai',
        text: 'Here is your essential revision summary for matrix diagonalization ahead of your exam:',
        subject: 'Algèbre Linéaire',
        formula: 'A = P · D · P⁻¹   where D = diag(λ₁, λ₂, ..., λₙ)',
        keyPoints: [
          '1. Characteristic Polynomial: Compute det(A - λI) = 0 to find all eigenvalues λᵢ.',
          '2. Eigenspaces: For each eigenvalue, find the kernel dim(Ker(A - λI)). A is diagonalizable iff geometric multiplicity = algebraic multiplicity for all λ.',
          '3. Invertible Matrix P: Columns of P are the linearly independent eigenvectors vᵢ corresponding to λᵢ.',
        ],
        timestamp: '08:45 AM',
      },
    ],
  },
  {
    id: 'conv-3',
    title: 'Physics Thermodynamics Review',
    preview: 'Heat capacity formula (Q = m·c·ΔT) & Mayer relation...',
    subject: 'Physique',
    dateGroup: 'Yesterday',
    timestamp: 'Yesterday',
    messages: [
      {
        id: 'c3-1',
        sender: 'user',
        text: 'Explain the heat capacity formula and Carnot cycle from yesterday’s lecture.',
        timestamp: 'Yesterday',
      },
      {
        id: 'c3-2',
        sender: 'ai',
        text: 'From the Physics lecture with Prof. Heisenberg:',
        subject: 'Physique',
        formula: 'Q = m · c · ΔT   and   dU = δQ - δW',
        keyPoints: [
          'Specific Heat Capacity (c): The energy required to raise 1 kg of a substance by 1 Kelvin (J/(kg·K)).',
          'Isochoric process (constant volume): dV = 0 ⟹ W = 0 ⟹ dU = Q_v = m · c_v · ΔT.',
          'Isobaric process (constant pressure): dH = Q_p = m · c_p · ΔT (where c_p > c_v by Mayer relation R).',
        ],
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'conv-4',
    title: 'Calculus Integration by Parts',
    preview: 'Integration by parts formula and LIATE priority rule...',
    subject: 'Analyse',
    dateGroup: 'Yesterday',
    timestamp: 'Yesterday',
    messages: [
      {
        id: 'c4-1',
        sender: 'user',
        text: 'Walk me through integration by parts step-by-step.',
        timestamp: 'Yesterday',
      },
      {
        id: 'c4-2',
        sender: 'ai',
        text: 'Here is the step-by-step framework for Integration by Parts (IBP):',
        subject: 'Analyse',
        formula: "∫ u · v' dx = u · v - ∫ u' · v dx",
        keyPoints: [
          'Mnemonic priority (LIATE): Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.',
          "Example: For ∫ x · eˣ dx, set u = x (u' = 1) and v' = eˣ (v = eˣ).",
          'Result: x·eˣ - ∫ 1·eˣ dx = eˣ(x - 1) + C.',
        ],
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'conv-5',
    title: 'Weekly Study Schedule Plan',
    preview: '3-day revision plan balancing 2 tasks and upcoming exam...',
    subject: 'Méthodologie',
    dateGroup: 'Previous 7 Days',
    timestamp: 'May 3',
    messages: [
      {
        id: 'c5-1',
        sender: 'user',
        text: 'Create a focused 3-day revision plan balancing my 2 due tasks and upcoming exam.',
        timestamp: 'May 3',
      },
      {
        id: 'c5-2',
        sender: 'ai',
        text: 'Here is your balanced 3-day revision roadmap:',
        subject: 'Méthodologie',
        keyPoints: [
          'Day 1 (Thursday): Morning classes + 2h deep focus block on Linear Algebra characteristic polynomials.',
          'Day 2 (Friday): 1.5h Physics problem sets + 2h Matrix Diagonalization practice problems.',
          'Day 3 (Saturday Morning): Light review of formulas + full mock test ahead of the exam.',
        ],
        timestamp: 'May 3',
      },
    ],
  },
];

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  onAddTasks,
  onAddSession,
  onNavigateToTasks,
  onNavigateToCalendar,
  mockTyping = false,
  mockState,
}) => {

  const initialMockState = mockState || parseAiMockStateFromUrl(mockTyping);

  const getInitialConversations = (): Conversation[] => {
    if (initialMockState === 'empty') return [];
    if (initialMockState === 'action') {
      return [ACTION_DEMO_CONVERSATION, ...INITIAL_CONVERSATIONS.filter((c) => c.id !== 'conv-1')];
    }
    return INITIAL_CONVERSATIONS;
  };

  const [conversations, setConversations] = useState<Conversation[]>(getInitialConversations);
  const [activeConvId, setActiveConvId] = useState<string>(() => parseActiveConvIdFromUrl(initialMockState));
  const [isWideLayout, setIsWideLayout] = useState(() => window.matchMedia('(min-width: 1440px)').matches);
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(isWideLayout);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1440px)');
    const update = () => setIsWideLayout(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const [searchHistory, setSearchHistory] = useState(() => parseSearchHistoryFromUrl(initialMockState));
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [thinkingStageLabel, setThinkingStageLabel] = useState('Analyzing query...');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const handleCopyMessage = (id: string, text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const streamTimerRef = useRef<any>(null);
  const pendingAiMsgRef = useRef<Message | null>(null);

  const handleStopGenerating = () => {
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
    if (pendingAiMsgRef.current && streamingContent) {
      const partialMsg: Message = {
        ...pendingAiMsgRef.current,
        text: streamingContent + ' [Generation stopped]',
      };
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvId) {
            return {
              ...c,
              messages: [...c.messages, partialMsg],
            };
          }
          return c;
        })
      );
    }
    setIsThinking(false);
    setIsStreaming(false);
    setStreamingContent('');
    pendingAiMsgRef.current = null;
  };

  useEffect(() => {
    if (initialMockState === 'typing' || mockTyping) {
      setIsThinking(true);
      setThinkingStageLabel('Formulating revision roadmap...');
      const sampleText = "I have analyzed your upcoming exams in Math and Physics. To maximize retention, I recommend scheduling a 90-minute revision block on diagonalisation tomorrow at 10:00 AM, followed by practical thermodynamics exercises in the afternoon.";
      pendingAiMsgRef.current = {
        id: 'msg-stream-demo',
        sender: 'ai',
        text: sampleText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const t1 = setTimeout(() => {
        setIsThinking(false);
        setIsStreaming(true);
        let idx = 0;
        streamTimerRef.current = setInterval(() => {
          idx += 3;
          if (idx >= sampleText.length) {
            clearInterval(streamTimerRef.current);
            setStreamingContent(sampleText);
          } else {
            setStreamingContent(sampleText.slice(0, idx));
          }
        }, 30);
      }, 700);

      return () => {
        clearTimeout(t1);
        if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      };
    }
  }, [initialMockState, mockTyping]);

  const activeConversation =
    conversations.find((c) => c.id === activeConvId) ||
    conversations[0] ||
    DRAFT_BLANK_CONVERSATION;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation.messages, isThinking]);

  useEffect(() => {
    const preventDefaults = (e: DragEvent) => {
      e.preventDefault();
    };
    window.addEventListener('dragover', preventDefaults);
    window.addEventListener('drop', preventDefaults);
    return () => {
      window.removeEventListener('dragover', preventDefaults);
      window.removeEventListener('drop', preventDefaults);
    };
  }, []);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      setIsDragging(false);
      dragCounter.current = 0;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles: AttachedFile[] = Array.from(e.dataTransfer.files).map((f) => ({
        id: 'file-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB',
        type: f.type,
      }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: AttachedFile[] = Array.from(e.target.files).map((f) => ({
        id: 'file-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB',
        type: f.type,
      }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
    if (e.target) e.target.value = '';
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const quickActions = [
    {
      title: 'Add 2 Tasks for Tomorrow',
      tag: 'Task Manager',
      icon: 'lucide:check-circle-2',
      color: 'text-orange-400',
      prompt: 'I have 2 tasks to do tomorrow: Complete Chapter 4 exercises and Review Physics notes.',
    },
    {
      title: 'Schedule Revision Block',
      tag: 'Calendar',
      icon: 'lucide:calendar-plus',
      color: 'text-cyan-400',
      prompt: 'Schedule a 2-hour revision session for Algèbre Linéaire this Friday at 14:00.',
    },
    {
      title: 'Daily Briefing',
      tag: 'Overview',
      icon: 'lucide:sparkles',
      color: 'text-emerald-400',
      prompt: 'What classes do I have today and what tasks are urgent?',
    },
    {
      title: 'Plan Exam Revision',
      tag: 'Exam Prep',
      icon: 'lucide:flame',
      color: 'text-red-400',
      prompt: 'I have an Algèbre Linéaire exam in 2 days. Plan my study blocks and add them to my calendar.',
    },
  ];

  const handleCreateNewChat = () => {
    const newId = 'conv-' + Date.now();
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      preview: 'Ask your assistant to add tasks or schedule sessions...',
      subject: 'General',
      dateGroup: 'Today',
      timestamp: 'Just now',
      messages: [
        {
          id: 'welcome-' + Date.now(),
          sender: 'ai',
          text: "New conversation started. Tell me what tasks you need to add, sessions to schedule, or concepts to review!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'ai');
      url.searchParams.set('chat', newId);
      url.searchParams.delete('ai');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeConvId === id) {
        if (filtered.length > 0) {
          setActiveConvId(filtered[0].id);
        } else {
          setActiveConvId('draft-blank');
        }
      }
      return filtered;
    });
  };

  const handleSend = (customQuery?: string) => {
    const query = (customQuery !== undefined ? customQuery : inputText).trim();
    if (!query && attachedFiles.length === 0) return;

    const filesToSend = customQuery ? [] : [...attachedFiles];
    const displayQuery =
      query ||
      (filesToSend.length > 0
        ? `Sent ${filesToSend.length} attached file${filesToSend.length > 1 ? 's' : ''}: ${filesToSend.map((f) => f.name).join(', ')}`
        : '');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: displayQuery,
      attachments: filesToSend.length > 0 ? filesToSend : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    let targetConvId = activeConvId;

    if (conversations.length === 0 || activeConvId === 'draft-blank') {
      targetConvId = 'conv-' + Date.now();
      const newConv: Conversation = {
        id: targetConvId,
        title: displayQuery.slice(0, 32) || 'New Conversation',
        preview: displayQuery,
        subject: 'General',
        dateGroup: 'Today',
        timestamp: 'Just now',
        messages: [userMsg],
      };
      setConversations([newConv]);
      setActiveConvId(targetConvId);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('page', 'ai');
        url.searchParams.set('chat', targetConvId);
        url.searchParams.delete('ai');
        window.history.replaceState({}, '', url.toString());
      }
    } else {
      // Append to current conversation
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetConvId) {
            const updatedMessages = [...c.messages, userMsg];
            const newTitle = c.title === 'New Conversation' ? displayQuery.slice(0, 32) : c.title;
            return {
              ...c,
              title: newTitle,
              preview: displayQuery,
              timestamp: 'Just now',
              messages: updatedMessages,
            };
          }
          return c;
        })
      );
    }

    setInputText('');
    setAttachedFiles([]);
    setIsThinking(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let aiReply: Message;

      // 0. INTENT: Attachments without query
      if (filesToSend.length > 0 && (!query || lower.includes('attach') || lower.includes('file'))) {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `I've received your attached document${filesToSend.length > 1 ? 's' : ''} (${filesToSend.map((f) => f.name).join(', ')}). The content has been processed.\n\nYou can ask me to summarize it, extract exercises into your tasks, or explain specific problem sets.`,
          keyPoints: [
            `Attachment received: ${filesToSend.map((f) => `${f.name} (${f.size})`).join(', ')}`,
            `Ready to answer questions, analyze concepts, or schedule study tasks from this file.`,
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      // 1. INTENT: Add Tasks
      if (
        (lower.includes('task') || lower.includes('tasks') || lower.includes('to do') || lower.includes('homework') || lower.includes('assignment')) &&
        (lower.includes('add') || lower.includes('have') || lower.includes('create') || lower.includes('need') || lower.includes('tomorrow'))
      ) {
        let extractedTasks: TaskData[] = [];

        if (lower.includes('2') || lower.includes('two') || lower.includes('and')) {
          extractedTasks = [
            {
              id: 'task-ai-' + Date.now(),
              title: 'Complete Chapter 4 Exercises',
              subject: 'Math',
              dueDate: 'Tomorrow',
              priority: 'High',
              description: 'Chapter 4 problems added automatically by AI Assistant.',
              subtasks: [
                { text: 'Review lecture examples', completed: false },
                { text: 'Solve exercises 1-15', completed: false },
              ],
            },
            {
              id: 'task-ai-' + (Date.now() + 1),
              title: 'Review Physics Notes',
              subject: 'Physics',
              dueDate: 'Tomorrow',
              priority: 'Medium',
              description: 'Quantum mechanics notes review added by AI Assistant.',
              subtasks: [
                { text: 'Check uncertainty principle notes', completed: false },
              ],
            },
          ];
        } else {
          extractedTasks = [
            {
              id: 'task-ai-' + Date.now(),
              title: query.replace(/(add|create|a task|task|for tomorrow|tomorrow)/gi, '').trim() || 'New Study Task',
              subject: lower.includes('phys') ? 'Physics' : lower.includes('math') ? 'Math' : 'Algèbre',
              dueDate: lower.includes('tomorrow') ? 'Tomorrow' : 'May 8',
              priority: 'High',
              description: 'Added automatically by AI Assistant from your instruction.',
            },
          ];
        }

        if (onAddTasks) {
          onAddTasks(extractedTasks);
        }

        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Understood! I've extracted the tasks and added them directly to your workspace.`,
          actionExecuted: {
            type: 'tasks_added',
            title: `Added ${extractedTasks.length} task${extractedTasks.length > 1 ? 's' : ''} to your workspace`,
            items: extractedTasks.map((t) => ({
              type: 'task',
              title: t.title,
              subject: t.subject,
              dueDate: t.dueDate,
            })),
          },
          keyPoints: [
            `Due Date: Set to Tomorrow (${extractedTasks[0].dueDate})`,
            `Priorities: High & Medium assigned based on your course syllabus`,
            `You can view and check them off anytime in the Tasks tab or on your Overview Dashboard.`,
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
      // 2. INTENT: Schedule Session / Calendar
      else if (lower.includes('schedule') || lower.includes('session') || lower.includes('calendar') || lower.includes('revision block')) {
        const newSession: SessionData = {
          id: 'session-ai-' + Date.now(),
          title: lower.includes('alg') ? 'Algèbre Linéaire — Diagonalization Revision' : 'Physics Problem Solving Session',
          subject: lower.includes('alg') ? 'Algèbre' : 'Physique',
          date: 'Vendredi 9 Mai',
          time: '14:00 - 16:00',
          room: 'Library Study Room 4',
          professor: 'Solo Revision',
          notes: [
            'Solve characteristic polynomial exercises',
            'Review eigenspace dimension theorems',
          ],
        };

        if (onAddSession) {
          onAddSession(newSession);
        }

        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Got it! I scheduled a focused 2-hour revision session into your calendar.`,
          actionExecuted: {
            type: 'session_scheduled',
            title: 'Scheduled Revision Session on Calendar',
            items: [
              {
                type: 'session',
                title: newSession.title,
                subject: newSession.subject,
                date: newSession.date,
                time: newSession.time,
              },
            ],
          },
          keyPoints: [
            `Time: Friday, May 9 from 14:00 to 16:00 (2 hours)`,
            `Focus: Key theorems before your upcoming exam in 2 days`,
            `Status: Synced with your Week and Day calendar views.`,
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
      // 3. INTENT: Daily briefing
      else if (lower.includes('today') || lower.includes('briefing') || lower.includes('classes') || lower.includes('schedule')) {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Here is your full academic briefing for today (Jeudi, 7 Mai 2026):`,
          keyPoints: [
            `📚 Today's Classes (4 sessions): 09:00 Mathematics (Room 27) • 11:00 Physics (Lab B-2) • 14:00 Thermodynamics • 16:00 Linear Algebra Tutorial.`,
            `⚡ Urgent Deadlines: 'Finish Mathematics Assignment' is due tonight at 23:59.`,
            `⚠️ Exam Alert: You have the Algèbre Linéaire exam in 2 days (Samedi 9 Mai).`,
            `📊 Progress: 1 of 3 tasks completed so far today.`,
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
      // 4. Academic question fallback
      else {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Here is the explanation breakdown for your question:`,
          formula: 'A = P · D · P⁻¹   where D = diag(λ₁, λ₂, ..., λₙ)',
          keyPoints: [
            `1. Conceptual Foundation: Make sure to check algebraic multiplicity vs geometric multiplicity.`,
            `2. Application: When calculating det(A - λI), factorize row by row to prevent calculation mistakes.`,
            `3. Action: Would you like me to add a practice task for this to your workspace?`,
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              messages: [...c.messages, aiReply],
            };
          }
          return c;
        })
      );
      setIsThinking(false);
    }, 650);
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.title.toLowerCase().includes(searchHistory.toLowerCase()) ||
      c.preview.toLowerCase().includes(searchHistory.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchHistory.toLowerCase())
  );

  const grouped = {
    Today: filteredConversations.filter((c) => c.dateGroup === 'Today'),
    Yesterday: filteredConversations.filter((c) => c.dateGroup === 'Yesterday'),
    'Previous 7 Days': filteredConversations.filter((c) => c.dateGroup === 'Previous 7 Days'),
  };

  const getSubjectBadgeStyle = (subject: string) => {
    const s = subject.toLowerCase();
    if (s.includes('alg')) return 'bg-algebre/15 text-[#f472b6] border-algebre/30';
    if (s.includes('ana')) return 'bg-analyse/15 text-[#22d3ee] border-analyse/30';
    if (s.includes('phys')) return 'bg-physique/15 text-[#34d399] border-physique/30';
    if (s.includes('méc') || s.includes('mec')) return 'bg-mecanique/15 text-[#60a5fa] border-mecanique/30';
    if (s.includes('méth') || s.includes('meth')) return 'bg-methodologie/15 text-[#fbbf24] border-methodologie/30';
    if (s.includes('task') || s.includes('plan')) return 'bg-white/10 text-zinc-200 border-white/20';
    return 'bg-cardHover text-zinc-300 border-borderPanel';
  };

  return (
    <div className="flex h-full w-full overflow-hidden relative">
      {/* Main Chat Stream Container */}
      <div
        className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Drag & Drop Visual Overlay */}
        {isDragging && (
          <div className="absolute inset-4 z-50 bg-[#0c0c0e]/92 backdrop-blur-md border-2 border-dashed border-zinc-400 rounded-3xl flex flex-col items-center justify-center pointer-events-none animate-in fade-in zoom-in-95 duration-150 shadow-2xl">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-4 shadow-2xl ring-4 ring-white/5">
              <iconify-icon icon="lucide:cloud-upload" width="40" className="text-white drop- transition-transform duration-300" />
            </div>
            <h3 className="text-[20px] font-bold text-white tracking-tight mb-2">
              Drop files here to attach
            </h3>
            <p className="text-[14px] font-medium text-zinc-400 max-w-sm text-center leading-relaxed">
              Release to attach documents, PDFs, problem sets, or study notes to this conversation
            </p>
            <div className="flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-cardHover border border-borderPanel text-[13px] font-mono text-zinc-300 shadow-sm">
              <iconify-icon icon="lucide:file-text" width="16" className="text-cyan-400" />
              <span>Supports PDF, Word, Images, Math notes & Code</span>
            </div>
          </div>
        )}
        {/* Top Header */}
        <header className="flex-wrap gap-4 px-4 sm:px-8 py-3.5 sm:py-5 border-b border-borderPanel flex items-center justify-between shrink-0 bg-panel/80 backdrop-blur-md">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 basis-80">
            <div className="relative">
              <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
                <iconify-icon icon="lucide:bot" width="22" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-[2.5px] border-[#09090b]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">AI Assistant</h1>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Action-Enabled
                </span>
              </div>
              <p className="text-sm font-medium text-textMuted hidden sm:block">
                Can manage tasks, schedule calendar sessions, and plan your study workflow
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 max-w-full">
            <button
              onClick={handleCreateNewChat}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-cardHover hover:bg-[#27272a] border border-borderPanel text-sm font-bold text-zinc-200 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <iconify-icon icon="lucide:plus" width="16" />
              <span>New Chat</span>
            </button>

            {/* Toggle History Sidebar Button */}
            <button
              onClick={() => setIsHistorySidebarOpen((prev) => !prev)}
              className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-[13px] sm:text-[14px] font-semibold transition-all ${
                isHistorySidebarOpen
                  ? 'bg-white text-black border-white shadow-sm'
                  : 'bg-cardHover text-zinc-200 hover:text-white border-borderPanel hover:bg-[#222226]'
              }`}
              aria-label={isHistorySidebarOpen ? 'Hide Past Conversations' : 'View Past Conversations'}
              aria-expanded={isHistorySidebarOpen}
            >
              <iconify-icon icon="lucide:history" width="17" />
              <span>History</span>
              <span
                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-bold transition-colors ${
                  isHistorySidebarOpen
                    ? 'bg-black/10 text-black'
                    : 'bg-white/10 text-zinc-300'
                }`}
              >
                {conversations.length}
              </span>
            </button>
          </div>
        </header>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3.5 sm:px-8 py-4 sm:py-6 scrollbar-hide">
          <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-6">
            {/* Welcome Hero with Action-driven Prompts */}
            {activeConversation.messages.length <= 1 && (
              <div className="flex flex-col items-center text-center my-6 sm:my-10 animate-in fade-in duration-300 w-full px-2 sm:px-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 shadow-xl ring-1 ring-white/10">
                  <iconify-icon icon="lucide:sparkles" width="32" />
                </div>
                <h2 className="text-xl sm:text-[24px] font-bold text-white tracking-tight">
                  How can I organize your studies today?
                </h2>
                <p className="mt-2 text-[14.5px] sm:text-[15px] text-zinc-400 max-w-lg leading-relaxed">
                  Tell me what tasks you need to do, schedule revision blocks, plan for exams, or ask academic questions.
                </p>

                {/* 4 Action Prompts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5 w-full mt-7 text-left">
                  {quickActions.map((qa, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(qa.prompt)}
                      className="p-4 sm:p-4.5 rounded-2xl bg-cardBg border border-borderPanel hover:border-zinc-500 hover:bg-cardHover transition-all text-left flex flex-col justify-between group shadow-sm active:scale-[0.99] cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-3">
                        <span className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${qa.color}`}>
                          <iconify-icon icon={qa.icon} width="14" />
                          {qa.tag}
                        </span>
                        <iconify-icon icon="lucide:arrow-up-right" width="16" className="text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[14.5px] font-bold text-white mb-1.5 leading-snug">
                        {qa.title}
                      </p>
                      <p className="text-[12.5px] font-medium text-textMuted group-hover:text-zinc-300 transition-colors line-clamp-2 leading-relaxed">
                        {qa.prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Stream */}
            {activeConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col w-full ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                } animate-in fade-in slide-in-from-bottom-2 duration-200`}
              >
                {msg.sender === 'user' ? (
                  <div className="max-w-[88%] sm:max-w-[78%] bg-[#1c1c20] border border-[#2a2a30] text-zinc-100 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 shadow-md">
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2.5">
                        {msg.attachments.map((f) => (
                          <div
                            key={f.id}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-[12px] text-zinc-200 font-mono"
                          >
                            <iconify-icon icon="lucide:file-text" width="14" className="text-cyan-400" />
                            <span className="truncate max-w-[180px]">{f.name}</span>
                            <span className="text-textSubtle text-[11px]">({f.size})</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {msg.text && <p className="text-[14px] font-medium leading-relaxed">{msg.text}</p>}
                    <span className="mt-1.5 block text-[11px] text-zinc-400 text-right font-medium">
                      {msg.timestamp}
                    </span>
                  </div>
                ) : (
                  <div className="w-full bg-cardBg border border-borderPanel rounded-2xl p-5 sm:p-6 shadow-sm relative group">
                    {/* AI Message Header */}
                    <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#1e1e24]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                          <iconify-icon icon="lucide:bot" width="15" />
                        </div>
                        <span className="text-[13.5px] font-bold text-white tracking-tight">GetStudy AI</span>
                        <span className="text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                          Academic Assistant
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          aria-label="Copy AI response"
                          className="opacity-75 group-hover:opacity-100 hover:opacity-100 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer"
                          title="Copy response"
                        >
                          <iconify-icon
                            icon={copiedMessageId === msg.id ? "lucide:check" : "lucide:copy"}
                            width="13"
                            className={copiedMessageId === msg.id ? "text-emerald-400" : ""}
                          />
                          <span>{copiedMessageId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                        <span className="text-[11px] text-textSubtle font-mono">{msg.timestamp}</span>
                      </div>
                    </div>

                    {/* Text */}
                    <p className="text-[14.5px] text-zinc-200 leading-relaxed font-normal whitespace-pre-line">
                      {msg.text}
                    </p>

                    {/* ACTION EXECUTED CARD: Visual proof of tasks/calendar added */}
                    {msg.actionExecuted && (
                      <div className="mt-4 p-4 rounded-xl bg-[#0e1614] border border-emerald-500/25 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-emerald-400 text-[13px] font-bold">
                            <iconify-icon icon="lucide:check-circle-2" width="16" />
                            <span>{msg.actionExecuted.title}</span>
                          </div>
                          {msg.actionExecuted.type === 'tasks_added' && onNavigateToTasks && (
                            <button
                              type="button"
                              onClick={onNavigateToTasks}
                              className="text-[12px] font-bold text-emerald-300 hover:text-white hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              View in Tasks <iconify-icon icon="lucide:arrow-up-right" width="14" />
                            </button>
                          )}
                          {msg.actionExecuted.type === 'session_scheduled' && onNavigateToCalendar && (
                            <button
                              type="button"
                              onClick={onNavigateToCalendar}
                              className="text-[12px] font-bold text-emerald-300 hover:text-white hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              View in Calendar <iconify-icon icon="lucide:arrow-up-right" width="14" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-2">
                          {msg.actionExecuted.items.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              className="flex items-center justify-between p-3 rounded-lg bg-[#131c19] border border-emerald-500/15"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                                <span className="text-[13px] font-bold text-white">{item.title}</span>
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cardHover text-zinc-300 border border-borderPanel">
                                  {item.subject}
                                </span>
                              </div>
                              <span className="text-[12px] font-medium text-zinc-400">
                                {item.dueDate || `${item.date} • ${item.time}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Formula Highlight with Native KaTeX Rendering */}
                    {msg.formula && (
                      <div className="my-4 p-4 rounded-xl bg-panel border border-borderPanel flex flex-col gap-2 shadow-inner">
                        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 text-cyan-400 font-sans font-bold">
                            <iconify-icon icon="lucide:function-square" width="14" />
                            Theorem & Formula
                          </span>
                          <span className="text-textSubtle">KaTeX Display</span>
                        </div>
                        <div className="py-2 text-white overflow-x-auto text-[15px] sm:text-base">
                          <LatexMath math={msg.formula} displayMode />
                        </div>
                      </div>
                    )}

                    {/* Key points */}
                    {msg.keyPoints && msg.keyPoints.length > 0 && (
                      <div className="mt-4 space-y-2.5 bg-cardHover/50 p-4 sm:p-5 rounded-xl border border-borderPanel/70">
                        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <iconify-icon icon="lucide:list-checks" width="14" className="text-cyan-400" />
                          Key Points & Steps
                        </div>
                        <ul className="space-y-2 text-[13.5px] text-zinc-200">
                          {msg.keyPoints.map((point, pIdx) => (
                            <li key={pIdx} className="leading-relaxed flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                              <span className="flex-1">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Thinking / Streaming Indicator */}
            {(isThinking || isStreaming) && (
              <div className="flex flex-col items-start gap-3 p-4 sm:p-5 rounded-2xl bg-cardBg border border-borderPanel max-w-[90%] sm:max-w-[78%] animate-in fade-in slide-in-from-bottom-2 duration-150 shadow-lg">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <iconify-icon icon="lucide:bot" width="16" />
                    </div>
                    <span className="text-[13px] font-bold text-zinc-200">GetStudy AI</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[11px] font-semibold tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>{thinkingStageLabel}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleStopGenerating}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-[11px] font-semibold transition-all cursor-pointer active:scale-95"
                    title="Stop AI Generation"
                  >
                    <iconify-icon icon="lucide:square" width="11" className="text-red-400 fill-current" />
                    <span>Stop</span>
                  </button>
                </div>

                {isStreaming ? (
                  <div className="text-[14.5px] leading-relaxed text-zinc-200 whitespace-pre-wrap font-sans">
                    {streamingContent}
                    <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-0.5 align-middle rounded-sm" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:200ms]" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:400ms]" />
                    </div>
                    <span className="text-[12.5px] font-medium text-zinc-400">Analyzing context and formulating response...</span>
                  </div>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Floating Docked Input Container */}
        {/* Bottom Input Composer */}
        <div className="px-3.5 sm:px-8 pb-3 sm:pb-6 pt-2 shrink-0 bg-gradient-to-t from-panel via-panel to-transparent">
          <div className="w-full max-w-[1240px] mx-auto bg-cardBg border border-borderPanel focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500/20 rounded-2xl p-2.5 sm:p-3 shadow-md transition-all">
            {/* Quick prompt suggestions when empty */}
            {inputText.length === 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide text-[12px]">
                <span className="text-textSubtle text-[11px] font-mono shrink-0">Prompts:</span>
                <button
                  type="button"
                  onClick={() => setInputText('I have 2 tasks to do tomorrow: Complete Math problem set and Review Physics notes.')}
                  className="px-2.5 py-1 rounded-lg bg-cardHover hover:bg-[#222226] text-zinc-300 hover:text-white border border-borderPanel shrink-0 transition-colors cursor-pointer text-[12px] font-medium flex items-center gap-1.5"
                >
                  <iconify-icon icon="lucide:check-square" width="13" className="text-emerald-400" />
                  <span>Add Tasks</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputText('Schedule a 2-hour revision session for Algèbre Linéaire this Friday at 14:00.')}
                  className="px-2.5 py-1 rounded-lg bg-cardHover hover:bg-[#222226] text-zinc-300 hover:text-white border border-borderPanel shrink-0 transition-colors cursor-pointer text-[12px] font-medium flex items-center gap-1.5"
                >
                  <iconify-icon icon="lucide:calendar-plus" width="13" className="text-cyan-400" />
                  <span>Schedule Session</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputText('Summarize key formulas and diagonalization theorems for matrix prep.')}
                  className="px-2.5 py-1 rounded-lg bg-cardHover hover:bg-[#222226] text-zinc-300 hover:text-white border border-borderPanel shrink-0 transition-colors cursor-pointer text-[12px] font-medium flex items-center gap-1.5"
                >
                  <iconify-icon icon="lucide:function-square" width="13" className="text-purple-400" />
                  <span>Explain Formulas</span>
                </button>
              </div>
            )}

            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Tell your AI Assistant: 'I have 2 tasks to do tomorrow...', 'Schedule a revision block...', or ask a question..."
              className="w-full bg-transparent text-white text-[13.5px] sm:text-[14px] placeholder:text-textSubtle focus:outline-none resize-none px-2"
            />

            {/* Attached files preview chips */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 px-2 pb-2">
                {attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cardHover border border-borderPanel text-[12px] text-zinc-200 shadow-sm animate-in fade-in"
                  >
                    <iconify-icon icon="lucide:file-text" width="14" className="text-cyan-400" />
                    <span className="font-medium max-w-[200px] truncate">{file.name}</span>
                    <span className="text-textSubtle font-medium text-[11px]">({file.size})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      aria-label="Remove attachment"
                      className="text-zinc-400 hover:text-red-400 transition-colors ml-1 p-0.5 rounded-md hover:bg-white/5"
                      title="Remove attachment"
                    >
                      <iconify-icon icon="lucide:x" width="13" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[#1e1e24] px-1">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cardHover hover:bg-[#222226] text-zinc-400 hover:text-white transition-all border border-borderPanel text-[13px] font-medium group active:scale-[0.98]"
                  title="Attach document, image, or homework"
                >
                  <iconify-icon icon="lucide:paperclip" width="15" className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Attach file</span>
                  {attachedFiles.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-white/10 text-white">
                      {attachedFiles.length}
                    </span>
                  )}
                </button>
                <span className="text-[11px] text-textSubtle font-mono hidden md:inline ml-1">
                  ↵ Enter to send • Shift+↵ for new line
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={(!inputText.trim() && attachedFiles.length === 0) || isThinking}
                className="w-9 h-9 sm:w-8 sm:h-8 min-w-[36px] min-h-[36px] rounded-xl bg-white disabled:bg-zinc-800 text-black disabled:text-textSubtle flex items-center justify-center transition-all hover:bg-zinc-200 active:scale-95 disabled:cursor-not-allowed shadow-md cursor-pointer relative after:absolute after:-inset-1 after:content-['']"
                aria-label="Send message"
                title="Send message"
              >
                <iconify-icon icon="lucide:arrow-up" width="16" />
              </button>
            </div>
          </div>
          <p className="text-center text-[11px] text-zinc-400 mt-2 hidden sm:block">
            Your AI Assistant can create tasks, update your calendar, and organize study sessions directly.
          </p>
        </div>
      </div>

      {/* Right Sidebar: Past Conversations Panel */}
      {isHistorySidebarOpen && (
        <Dialog modal={!isWideLayout} label="Conversation history" onClose={() => setIsHistorySidebarOpen(false)}>
          {/* Compact-layout backdrop */}
          {!isWideLayout && <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsHistorySidebarOpen(false)}
          />}
          <aside aria-label="Conversation history" className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-[360px] min-[1440px]:relative min-[1440px]:inset-auto min-[1440px]:w-[360px] border-l border-borderPanel bg-[#0c0c0e] flex flex-col h-full shrink-0 animate-in slide-in-from-right-4 duration-200 shadow-2xl">
          {/* Header of History Sidebar */}
          <div className="px-5 py-4 border-b border-borderPanel flex items-center justify-between bg-panel">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cardHover border border-borderPanel flex items-center justify-center text-zinc-300">
                <iconify-icon icon="lucide:messages-square" width="18" />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">Conversations</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-cardHover border border-borderPanel text-zinc-300">
                  {conversations.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCreateNewChat}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[12px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                title="Start New Chat"
              >
                <iconify-icon icon="lucide:plus" width="14" />
                <span>New</span>
              </button>
              <button
                type="button"
                onClick={() => setIsHistorySidebarOpen(false)}
                aria-label="Close conversation history"
                className="w-9 h-9 min-w-[36px] min-h-[36px] sm:w-8 sm:h-8 rounded-lg hover:bg-cardHover text-zinc-400 hover:text-white flex items-center justify-center transition-colors border border-transparent hover:border-borderPanel relative after:absolute after:-inset-2 after:content-['']"
                title="Close Panel"
              >
                <iconify-icon icon="lucide:x" width="18" />
              </button>
            </div>
          </div>

          {/* Search Box - Matches Design System Search Bar */}
          <div className="p-4 border-b border-borderPanel bg-panel/60">
            <div className="relative flex items-center bg-cardBg border border-borderPanel rounded-xl px-3.5 py-2.5 shadow-sm focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500/30 transition-all">
              <iconify-icon
                icon="lucide:search"
                width="18"
                className="text-zinc-400 mr-2.5 shrink-0"
              />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchHistory}
                onChange={(e) => setSearchHistory(e.target.value)}
                className="w-full bg-transparent text-[14px] font-medium text-white placeholder:text-textMuted focus:outline-none"
              />
              {searchHistory ? (
                <button
                  type="button"
                  onClick={() => setSearchHistory('')}
                  aria-label="Clear search input"
                  className="text-zinc-400 hover:text-white transition-colors ml-2 shrink-0 p-1 min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                  title="Clear search"
                >
                  <iconify-icon icon="lucide:x" width="16" />
                </button>
              ) : (
                <span className="text-[11px] font-mono text-textSubtle bg-cardHover border border-borderPanel px-1.5 py-0.5 rounded shrink-0">
                  /
                </span>
              )}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
            {conversations.length === 0 ? (
              <div className="py-16 px-4 text-center flex flex-col items-center justify-center gap-3.5 animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-cardHover border border-borderPanel flex items-center justify-center text-zinc-400 shadow-inner">
                  <iconify-icon icon="lucide:messages-square" width="30" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[17px] font-bold text-white tracking-tight">No conversations yet</h3>
                  <p className="text-[13px] text-textMuted max-w-[240px] leading-relaxed mx-auto">
                    Start a chat to organize tasks, schedule sessions, or solve exercises.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCreateNewChat}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-[13px] transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <iconify-icon icon="lucide:plus" width="16" />
                  <span>Start New Chat</span>
                </button>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="py-16 px-4 text-center flex flex-col items-center justify-center gap-3.5 animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-cardHover border border-borderPanel flex items-center justify-center text-zinc-400 shadow-inner">
                  <iconify-icon icon="lucide:search-x" width="30" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[17px] font-bold text-white tracking-tight">No conversations found</h3>
                  <p className="text-[13px] text-textMuted max-w-[240px] leading-relaxed mx-auto">
                    No chats matched &ldquo;{searchHistory}&rdquo;
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchHistory('')}
                  className="mt-2 px-4 py-2 rounded-xl bg-cardHover border border-borderPanel hover:bg-[#222226] text-white font-semibold text-[13px] transition-all cursor-pointer"
                >
                  Clear search filter
                </button>
              </div>
            ) : (
              (['Today', 'Yesterday', 'Previous 7 Days'] as const).map((group) => {
                const items = grouped[group];
                if (!items || items.length === 0) return null;

                return (
                  <div key={group} className="space-y-2">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-textMuted">
                        {group}
                      </span>
                      <span className="text-[11px] font-medium text-textSubtle">
                        {items.length}
                      </span>
                    </div>

                    {items.map((conv) => {
                      const isActive = conv.id === activeConvId;
                      return (
                        <div
                          key={conv.id}
                          onClick={() => {
                            setActiveConvId(conv.id);
                            if (typeof window !== 'undefined') {
                              const url = new URL(window.location.href);
                              url.searchParams.set('page', 'ai');
                              url.searchParams.set('chat', conv.id);
                              url.searchParams.delete('ai');
                              window.history.replaceState({}, '', url.toString());
                            }
                            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                              setIsHistorySidebarOpen(false);
                            }
                          }}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer group relative flex flex-col gap-2 ${
                            isActive
                              ? 'bg-cardHover border-zinc-500 shadow-md ring-1 ring-zinc-500/20'
                              : 'border-transparent hover:border-borderPanel hover:bg-cardBg'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h3
                              className={`text-[14px] font-semibold truncate flex-1 leading-snug ${
                                isActive ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                              }`}
                            >
                              {conv.title}
                            </h3>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteConversation(conv.id, e)}
                              aria-label={`Delete conversation ${conv.title}`}
                              className="opacity-80 md:opacity-0 md:group-hover:opacity-100 w-7 h-7 rounded-md hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                              title="Delete Conversation"
                            >
                              <iconify-icon icon="lucide:trash-2" width="14" />
                            </button>
                          </div>

                          <p className="text-[13px] text-textMuted group-hover:text-zinc-300 transition-colors line-clamp-2 leading-relaxed">
                            {conv.preview}
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-[#1e1e24] text-[12px]">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getSubjectBadgeStyle(
                                conv.subject
                              )}`}
                            >
                              {conv.subject}
                            </span>
                            <span className="text-textSubtle font-medium text-[12px]">{conv.timestamp}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer of History Sidebar */}
          <div className="px-5 py-3.5 border-t border-borderPanel flex items-center justify-between text-[13px] text-textMuted bg-panel">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{conversations.length} conversations stored</span>
            </div>
            <span className="text-[12px] text-textSubtle font-mono">Local</span>
          </div>
        </aside>
        </Dialog>
    )}
    </div>
  );
};
