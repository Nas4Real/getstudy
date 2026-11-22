import React, { useState, useMemo } from 'react';
import { UploadDocumentModal, type DocumentUploadData } from '../modals/UploadDocumentModal';
import { DocumentDetailsModal, type DocumentItem } from '../modals/DocumentDetailsModal';

export type DocumentsMockState =
  | 'normal'
  | 'empty'
  | 'empty-folder'
  | 'search-empty'
  | 'drive-synced';

interface DocumentsViewProps {
  onShowToast?: (msg: string) => void;
  onNavigateToAi?: () => void;
  mockState?: DocumentsMockState;
  mockSearchEmpty?: boolean;
}

export interface DirectoryItem {
  id: string;
  name: string;
  parentPath: string[]; // [] for root
  color: string;
  itemCount: number;
  size: string;
  description?: string;
}

const DIRECTORY_FOLDERS: DirectoryItem[] = [
  // Root Level Folders
  {
    id: 'f-analyse',
    name: 'Analyse',
    parentPath: [],
    color: '#06b6d4',
    itemCount: 4,
    size: '1.2 GB',
    description: 'Calcul différentiel, séries, intégrales et topologie.',
  },
  {
    id: 'f-physique',
    name: 'Physique',
    parentPath: [],
    color: '#10b981',
    itemCount: 3,
    size: '850 MB',
    description: 'Thermodynamique, mécanique analytique et ondes.',
  },
  {
    id: 'f-algebre',
    name: 'Algèbre',
    parentPath: [],
    color: '#a855f7',
    itemCount: 3,
    size: '920 MB',
    description: 'Espaces vectoriels, réduction, matrices et dualité.',
  },
  {
    id: 'f-informatique',
    name: 'Informatique',
    parentPath: [],
    color: '#f59e0b',
    itemCount: 3,
    size: '420 MB',
    description: 'Structures de données, algorithmique et devoirs Python.',
  },

  // Subfolders inside Analyse (parentPath: ['Analyse'])
  {
    id: 'f-an-cours',
    name: 'Cours & Polys',
    parentPath: ['Analyse'],
    color: '#06b6d4',
    itemCount: 2,
    size: '480 MB',
    description: 'Polycopiés officiels et théorèmes fondamentaux.',
  },
  {
    id: 'f-an-td',
    name: 'TD & Séries',
    parentPath: ['Analyse'],
    color: '#06b6d4',
    itemCount: 3,
    size: '510 MB',
    description: 'Fiches d’exercices corrigées et planches de TD.',
  },
  {
    id: 'f-an-devoirs',
    name: 'Devoirs & Concours',
    parentPath: ['Analyse'],
    color: '#06b6d4',
    itemCount: 2,
    size: '210 MB',
    description: 'Devoirs surveillés, synthèses et annales corrigées.',
  },

  // Subfolders inside Physique (parentPath: ['Physique'])
  {
    id: 'f-phy-thermo',
    name: 'Thermodynamique',
    parentPath: ['Physique'],
    color: '#10b981',
    itemCount: 2,
    size: '320 MB',
    description: 'Modèle d’Einstein, entropie et machines thermiques.',
  },
  {
    id: 'f-phy-tp',
    name: 'Comptes-Rendus TP',
    parentPath: ['Physique'],
    color: '#10b981',
    itemCount: 2,
    size: '280 MB',
    description: 'Rapports d’expérimentation et mesures oscilloscopes.',
  },
  {
    id: 'f-phy-exams',
    name: 'Devoirs de Synthèse',
    parentPath: ['Physique'],
    color: '#10b981',
    itemCount: 1,
    size: '250 MB',
    description: 'Partiels blancs et annales de concours.',
  },

  // Subfolders inside Algèbre (parentPath: ['Algèbre'])
  {
    id: 'f-alg-evn',
    name: 'Espaces Vectoriels & Matrices',
    parentPath: ['Algèbre'],
    color: '#a855f7',
    itemCount: 2,
    size: '410 MB',
    description: 'Familles libres, bases et calcul matriciel.',
  },
  {
    id: 'f-alg-reduction',
    name: 'Réduction & Diagonalisation',
    parentPath: ['Algèbre'],
    color: '#a855f7',
    itemCount: 2,
    size: '340 MB',
    description: 'Spectres, trigonalisation et endomorphismes symétriques.',
  },

  // Subfolders inside Informatique (parentPath: ['Informatique'])
  {
    id: 'f-inf-algo',
    name: 'Algorithmique & Graphes',
    parentPath: ['Informatique'],
    color: '#f59e0b',
    itemCount: 2,
    size: '220 MB',
    description: 'Arbres, parcours en largeur/profondeur, Dijkstra.',
  },
  {
    id: 'f-inf-projets',
    name: 'Projets & TD Python',
    parentPath: ['Informatique'],
    color: '#f59e0b',
    itemCount: 2,
    size: '200 MB',
    description: 'Scripts de test, complexité et programmation dynamique.',
  },
];

interface StoredDocument extends DocumentItem {
  dirPath: string[]; // directory location, e.g. ['Analyse', 'TD & Séries']
}

const INITIAL_DOCUMENTS: StoredDocument[] = [
  {
    id: 'doc-1',
    title: 'Analysis Data July',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    date: 'Aug 5, 2026',
    size: '1.0 MB',
    type: 'PDF',
    driveSynced: true,
    drivePath: '/GetStudy/Analyse/Analysis_Data_July.pdf',
    dirPath: ['Analyse', 'Cours & Polys'],
    summary: 'Comprehensive analysis on suite convergences and numerical bounds. Includes detailed notes on series criteria.',
    keyPoints: ['Riemann sum approximations', 'Taylor polynomial limits', 'Lagrange remainders'],
  },
  {
    id: 'doc-2',
    title: 'Q2 Results & Midterm Review',
    subject: 'Physique',
    subjectColor: '#10b981',
    date: 'Jul 31, 2026',
    size: '2.5 MB',
    type: 'DOCX',
    driveSynced: true,
    drivePath: '/GetStudy/Physique/Q2_Results_Review.docx',
    dirPath: ['Physique', 'Devoirs de Synthèse'],
    summary: 'Detailed solution manual for quantum mechanics and thermodynamics past midterm.',
  },
  {
    id: 'doc-3',
    title: 'Electrometer Data & Lab Report',
    subject: 'Physique',
    subjectColor: '#10b981',
    date: 'Jul 25, 2026',
    size: '1.9 MB',
    type: 'PDF',
    driveSynced: true,
    drivePath: '/GetStudy/Physique/Electrometer_Lab.pdf',
    dirPath: ['Physique', 'Comptes-Rendus TP'],
  },
  {
    id: 'doc-4',
    title: 'TD Séries Entières & Corrigé',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    date: 'Jul 20, 2026',
    size: '3.2 MB',
    type: 'PDF',
    driveSynced: true,
    drivePath: '/GetStudy/Analyse/TD_Series_Entieres.pdf',
    dirPath: ['Analyse', 'TD & Séries'],
    summary: '8 rigorous examination exercises with step-by-step proofs for power series radius and uniform convergence.',
  },
  {
    id: 'doc-5',
    title: 'Chapitre 3 : Convexité & Dérivabilité',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    date: 'Jul 18, 2026',
    size: '1.5 MB',
    type: 'PDF',
    driveSynced: false,
    dirPath: ['Analyse', 'Cours & Polys'],
  },
  {
    id: 'doc-6',
    title: 'Physique Quantique : Ondes et Particules',
    subject: 'Physique',
    subjectColor: '#10b981',
    date: 'Jul 12, 2026',
    size: '4.8 MB',
    type: 'PDF',
    driveSynced: true,
    dirPath: ['Physique', 'Thermodynamique'],
  },
  {
    id: 'doc-7',
    title: 'Résumé Algèbre & Diagonalisation',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    date: 'Jul 10, 2026',
    size: '800 KB',
    type: 'PDF',
    driveSynced: true,
    drivePath: '/GetStudy/Algèbre/Resume_Algebre_Matrices.pdf',
    dirPath: ['Algèbre', 'Réduction & Diagonalisation'],
  },
  {
    id: 'doc-8',
    title: 'Exercices Corrigés : Tri & Complexité',
    subject: 'Informatique',
    subjectColor: '#f59e0b',
    date: 'Jul 05, 2026',
    size: '2.2 MB',
    type: 'PDF',
    driveSynced: true,
    dirPath: ['Informatique', 'Algorithmique & Graphes'],
  },
  {
    id: 'doc-9',
    title: 'Devoir de Contrôle n°1 Analyse 2025',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    date: 'Jun 28, 2026',
    size: '1.8 MB',
    type: 'PDF',
    driveSynced: true,
    dirPath: ['Analyse', 'Devoirs & Concours'],
  },
  {
    id: 'doc-10',
    title: 'Espaces Vectoriels : 25 Exercices Fondamentaux',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    date: 'Jun 15, 2026',
    size: '2.1 MB',
    type: 'PDF',
    driveSynced: true,
    dirPath: ['Algèbre', 'Espaces Vectoriels & Matrices'],
  },
];

const parseMockStateFromUrl = (fallbackMockEmpty?: boolean): DocumentsMockState => {
  if (fallbackMockEmpty) return 'search-empty';
  if (typeof window === 'undefined') return 'normal';
  const p = new URLSearchParams(window.location.search);
  const s = (p.get('docs') || p.get('doc') || p.get('documents') || p.get('files') || '').toLowerCase();
  if (s === 'empty' || s === '0' || s === 'none' || s === 'empty-library') return 'empty';
  if (s === 'empty-folder' || s === 'folder-empty') return 'empty-folder';
  if (s === 'search-empty' || s === 'no-results') return 'search-empty';
  if (s === 'drive' || s === 'drive-synced' || s === 'cloud') return 'drive-synced';
  if (p.get('state') === 'search-empty') return 'search-empty';
  return 'normal';
};

const parseFolderFromUrl = (mock: DocumentsMockState): string[] => {
  if (mock === 'empty-folder') return ['Informatique', 'Projets & TD Python'];
  if (typeof window === 'undefined') return [];
  const p = new URLSearchParams(window.location.search);
  const f = (p.get('folder') || p.get('dir') || '').trim();
  if (!f || f === 'root') return [];
  const segments = f.split('/').map((s) => s.trim()).filter(Boolean);
  return segments.map((seg) => {
    const l = seg.toLowerCase();
    if (l === 'analyse') return 'Analyse';
    if (l === 'physique') return 'Physique';
    if (l === 'algebre' || l === 'algèbre') return 'Algèbre';
    if (l === 'informatique' || l === 'info') return 'Informatique';
    if (l === 'cours' || l === 'cours & polys') return 'Cours & Polys';
    if (l === 'td' || l === 'td & séries') return 'TD & Séries';
    if (l === 'devoirs' || l === 'devoirs & concours') return 'Devoirs & Concours';
    if (l === 'thermodynamique') return 'Thermodynamique';
    if (l === 'tp' || l === 'comptes-rendus tp') return 'Comptes-Rendus TP';
    return seg;
  });
};

const parseSearchQueryFromUrl = (mock: DocumentsMockState, fallbackMockEmpty?: boolean): string => {
  if (mock === 'search-empty' || fallbackMockEmpty) return 'NonExistentDoc.pdf';
  if (typeof window === 'undefined') return '';
  const p = new URLSearchParams(window.location.search);
  return p.get('q') || p.get('search') || '';
};

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  onShowToast,
  onNavigateToAi,
  mockState,
  mockSearchEmpty = false,
}) => {
  const activeMockState = mockState || parseMockStateFromUrl(mockSearchEmpty);

  const [documents, setDocuments] = useState<StoredDocument[]>(() => {
    if (activeMockState === 'empty') return [];
    if (activeMockState === 'drive-synced') {
      return INITIAL_DOCUMENTS.filter((d) => d.driveSynced);
    }
    return INITIAL_DOCUMENTS;
  });

  const [currentPath, setCurrentPath] = useState<string[]>(() => parseFolderFromUrl(activeMockState));
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('modal') === 'upload' || p.get('modal') === 'upload-document';
    }
    return false;
  });
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('modal') === 'document-details' || p.get('modal') === 'doc-details') {
        return INITIAL_DOCUMENTS[0];
      }
    }
    return null;
  });
  const [searchQuery, setSearchQuery] = useState(() => parseSearchQueryFromUrl(activeMockState, mockSearchEmpty));

  const updateUrlParam = (key: string, value: string | null) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (!value || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
    window.history.replaceState(null, '', url.pathname + url.search);
  };

  // Handle uploading a document
  const handleUpload = (uploadData: DocumentUploadData) => {
    // Default directory path is either current folder path or the subject root
    const uploadDirPath = currentPath.length > 0 ? [...currentPath] : [uploadData.subject];

    const newDoc: StoredDocument = {
      id: `doc-${Date.now()}`,
      title: uploadData.title,
      subject: uploadData.subject,
      subjectColor: uploadData.subjectColor,
      date: 'Just now',
      size: uploadData.fileSize,
      type: 'PDF',
      driveSynced: uploadData.saveToDrive,
      drivePath: uploadData.saveToDrive ? `/GetStudy/${uploadDirPath.join('/')}/${uploadData.fileName}` : undefined,
      dirPath: uploadDirPath,
      summary: uploadData.generateAiSummary ? `AI analysis pending for ${uploadData.title}...` : undefined,
    };

    setDocuments((prev) => [newDoc, ...prev]);
    onShowToast?.(`"${uploadData.title}" uploaded to /${uploadDirPath.join('/')}`);
  };

  // Directory Navigation Helpers
  const navigateToFolder = (folderName: string) => {
    setSearchQuery('');
    updateUrlParam('q', null);
    setCurrentPath((prev) => {
      const next = [...prev, folderName];
      updateUrlParam('folder', next.join('/'));
      return next;
    });
  };

  const navigateToBreadcrumb = (index: number) => {
    setSearchQuery('');
    updateUrlParam('q', null);
    if (index === -1) {
      setCurrentPath([]);
      updateUrlParam('folder', null);
    } else {
      setCurrentPath((prev) => {
        const next = prev.slice(0, index + 1);
        updateUrlParam('folder', next.join('/'));
        return next;
      });
    }
  };

  const navigateUp = () => {
    setSearchQuery('');
    updateUrlParam('q', null);
    setCurrentPath((prev) => {
      const next = prev.slice(0, prev.length - 1);
      updateUrlParam('folder', next.length > 0 ? next.join('/') : null);
      return next;
    });
  };

  // Folders present in the current directory level
  const currentFolders = useMemo(() => {
    return DIRECTORY_FOLDERS.filter((f) => {
      if (f.parentPath.length !== currentPath.length) return false;
      return f.parentPath.every((segment, i) => segment === currentPath[i]);
    });
  }, [currentPath]);

  // Documents residing in current folder or deeper
  const currentFolderDocs = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return documents.filter(
        (doc) =>
          doc.title.toLowerCase().includes(q) ||
          doc.subject.toLowerCase().includes(q) ||
          doc.dirPath.some((segment) => segment.toLowerCase().includes(q))
      );
    }

    return documents.filter((doc) => {
      if (currentPath.length === 0) {
        // At root: show recent or root documents
        return true;
      }
      // Check if doc is in this folder path or starts with currentPath
      return currentPath.every((segment, idx) => doc.dirPath[idx] === segment);
    });
  }, [documents, currentPath, searchQuery]);

  return (
    <div id="page-documents" className="flex flex-col h-full w-full text-zinc-200">
      {/* Header & Primary Actions */}
      <header className="px-4 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-5 shrink-0 flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-borderPanel bg-panel/85 backdrop-blur-md sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-1.5 sm:mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
              Documents & File System
            </h1>
            <span className="text-xs sm:text-[12.5px] font-bold px-3 py-1 rounded-full bg-[#18181c] text-zinc-300 border border-borderPanel">
              {activeMockState === 'drive-synced' ? (
                <span className="text-sky-400 flex items-center gap-1.5">
                  <iconify-icon icon="lucide:cloud" width="13" />
                  <span>{documents.length} Synced to Drive</span>
                </span>
              ) : (
                <span>{documents.length} Files</span>
              )}
            </span>
          </div>
          <p className="text-sm font-medium text-textMuted">
            Browse course directories, download tutorial sheets, and access synced Google Drive materials.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full sm:w-auto justify-center bg-white hover:bg-zinc-200 text-black px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <iconify-icon icon="lucide:plus" width="16" />
            <span>Upload Document</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-20 md:pb-10 flex flex-col gap-6 scrollbar-hide">
        {/* Search Bar */}
        <div className="relative w-full group">
          <div className="relative flex items-center bg-[#0d0d11] border border-[#272730] focus-within:border-zinc-400 rounded-2xl px-4 sm:px-5 h-12 sm:h-[52px] shadow-sm transition-all">
            <iconify-icon icon="lucide:search" width="20" className="text-zinc-400 mr-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                updateUrlParam('q', e.target.value);
              }}
              placeholder="Search across all files, course notes, and directories..."
              className="bg-transparent border-none outline-none text-[15px] text-white w-full placeholder:text-textSubtle font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  updateUrlParam('q', null);
                  updateUrlParam('docs', null);
                }}
                aria-label="Clear document search"
                className="text-zinc-400 hover:text-white mr-2.5 cursor-pointer p-1"
              >
                <iconify-icon icon="lucide:x" width="18" />
              </button>
            )}
            <div className="flex items-center gap-1.5 ml-auto shrink-0">
              <span className="text-[11px] bg-cardHover border border-borderPanel text-zinc-400 px-2 py-0.5 rounded-md font-bold tracking-widest shadow-sm">
                ⌘
              </span>
              <span className="text-[11px] bg-cardHover border border-borderPanel text-zinc-400 px-2 py-0.5 rounded-md font-bold tracking-widest shadow-sm">
                K
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DIRECTORY BREADCRUMBS & NAVIGATION BAR */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[#232328] bg-[#0c0c0f]">
          <div className="flex items-center gap-2 flex-wrap text-[13.5px]">
            {/* Back button if inside a subfolder */}
            {currentPath.length > 0 && (
              <button
                type="button"
                onClick={navigateUp}
                className="mr-1 px-3 py-1.5 rounded-lg bg-[#18181e] hover:bg-[#22222a] border border-[#2c2c34] text-zinc-200 hover:text-white text-[12px] font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Go up one folder level"
              >
                <iconify-icon icon="lucide:arrow-left" width="14" />
                <span>Back</span>
              </button>
            )}

            {/* Root "Documents" segment */}
            <button
              type="button"
              onClick={() => navigateToBreadcrumb(-1)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                currentPath.length === 0
                  ? 'font-bold text-white bg-white/10'
                  : 'font-semibold text-zinc-400 hover:text-white hover:bg-cardHover'
              }`}
            >
              <iconify-icon icon="lucide:hard-drive" width="15" className="text-zinc-400" />
              <span>Documents</span>
            </button>

            {/* Path segments */}
            {currentPath.map((segment, idx) => {
              const isLast = idx === currentPath.length - 1;
              return (
                <React.Fragment key={idx}>
                  <iconify-icon icon="lucide:chevron-right" width="14" className="text-zinc-400" />
                  <button
                    type="button"
                    onClick={() => navigateToBreadcrumb(idx)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      isLast
                        ? 'font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                        : 'font-semibold text-zinc-400 hover:text-white hover:bg-cardHover'
                    }`}
                  >
                    <iconify-icon icon="lucide:folder-open" width="15" className="text-cyan-400" />
                    <span>{segment}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <div className="text-[12px] font-medium text-zinc-400">
            {currentFolders.length} folder{currentFolders.length !== 1 ? 's' : ''} • {currentFolderDocs.length} file{currentFolderDocs.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* ======================================================== */}
        {/* FOLDERS GRID (Browse into folders by clicking) */}
        {/* ======================================================== */}
        {currentFolders.length > 0 && !searchQuery && documents.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <iconify-icon icon="lucide:folder" width="20" className="text-zinc-400" />
                <span>
                  {currentPath.length === 0
                    ? 'Root Directories'
                    : `Subfolders in ${currentPath[currentPath.length - 1]}`}
                </span>
              </h2>
              <span className="text-[12.5px] font-medium text-zinc-400">
                Click any folder to navigate inside
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentFolders.map((folder) => (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() => navigateToFolder(folder.name)}
                  className="bg-[#0e0e12] border border-[#232328] hover:border-zinc-500 hover:bg-[#141419] rounded-2xl p-5 cursor-pointer transition-all group shadow-sm flex flex-col justify-between active:scale-[0.98] relative overflow-hidden text-left w-full focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                >
                  {/* Subtle Accent Glow */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: folder.color }}
                  />

                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${folder.color}15`,
                        borderColor: `${folder.color}35`,
                        color: folder.color,
                      }}
                    >
                      <iconify-icon icon="lucide:folder" width="24" />
                    </div>
                    <span className="text-[11px] font-bold text-zinc-400 bg-[#16161c] px-2 py-0.5 rounded border border-[#25252c]">
                      {folder.itemCount} items
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[15px] font-bold text-white group-hover:text-cyan-200 transition-colors mb-1 flex items-center justify-between">
                      <span>{folder.name}</span>
                      <iconify-icon
                        icon="lucide:chevron-right"
                        width="15"
                        className="text-textSubtle group-hover:translate-x-1 group-hover:text-white transition-all"
                      />
                    </h3>
                    <p className="text-[12px] text-zinc-400 font-medium line-clamp-1">
                      {folder.description || `${folder.size} stored`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* FILES TABLE IN CURRENT DIRECTORY */}
        {/* ======================================================== */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <iconify-icon icon="lucide:file-text" width="20" className="text-zinc-400" />
              <span>
                {searchQuery
                  ? `Search Results for "${searchQuery}" (${currentFolderDocs.length})`
                  : currentPath.length === 0
                  ? `All Files (${currentFolderDocs.length})`
                  : `Files in /${currentPath.join('/')} (${currentFolderDocs.length})`}
              </span>
            </h2>
            {currentPath.length > 0 && (
              <span className="text-[12px] font-mono text-zinc-400">
                Directory: /{currentPath.join('/')}
              </span>
            )}
          </div>

          {currentFolderDocs.length === 0 ? (
            searchQuery.trim() ? (
              <div className="bg-[#0b0b0e] border border-[#222228] rounded-2xl py-16 sm:py-20 px-6 sm:px-12 text-center flex flex-col items-center justify-center my-2 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-2xl bg-[#1c1c20] border border-[#2e2e34] flex items-center justify-center text-zinc-400 mb-4 shadow-xl">
                  <iconify-icon icon="lucide:search-x" width="34" />
                </div>
                <h3 className="text-xl sm:text-xl font-bold text-white mb-2 tracking-tight">
                  No documents matching "{searchQuery}"
                </h3>
                <p className="text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed">
                  We couldn't find any file with that name in this folder or search scope.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    updateUrlParam('q', null);
                    updateUrlParam('docs', null);
                  }}
                  className="px-6 py-2.5 bg-cardHover hover:bg-[#27272a] text-zinc-100 hover:text-white border border-[#272730] hover:border-zinc-500 rounded-full text-sm font-bold transition-all shadow-md cursor-pointer active:scale-95"
                >
                  Clear Search
                </button>
              </div>
            ) : documents.length === 0 ? (
              <div className="bg-[#0b0b0e] border border-[#222228] rounded-2xl py-16 sm:py-20 px-6 sm:px-12 text-center flex flex-col items-center justify-center my-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-b from-[#1c1c22] to-[#121216] border border-borderPanel flex items-center justify-center text-cyan-400 mb-4 shadow-xl">
                  <iconify-icon icon="lucide:folder-plus" width="34" />
                </div>
                <h3 className="text-xl sm:text-xl font-bold text-white mb-2 tracking-tight">
                  No documents in your library yet
                </h3>
                <p className="text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed">
                  Upload your syllabus notes, tutorial problem sheets, exam papers, and course polycopiés to organize them across subjects.
                </p>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-6 py-3 bg-white hover:bg-zinc-200 text-black rounded-full text-[14px] font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <iconify-icon icon="lucide:plus" width="16" />
                  <span>Upload Your First Document</span>
                </button>
              </div>
            ) : (
              <div className="bg-[#0b0b0e] border border-[#222228] rounded-2xl py-16 sm:py-20 px-6 sm:px-12 text-center flex flex-col items-center justify-center my-2 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-2xl bg-[#16161c] border border-[#27272f] flex items-center justify-center text-zinc-300 mb-4 shadow-inner">
                  <iconify-icon icon="lucide:folder-open" width="34" />
                </div>
                <h3 className="text-xl sm:text-xl font-bold text-white mb-2 tracking-tight">
                  No files in this folder yet
                </h3>
                <p className="text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed">
                  You can upload lecture notes, problem sets, or past exams directly into this directory.
                </p>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-6 py-2.5 bg-white text-black rounded-full text-[14px] font-bold hover:bg-zinc-200 transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <iconify-icon icon="lucide:plus" width="16" />
                  <span>Upload File Here</span>
                </button>
              </div>
            )
          ) : (
            <div className="w-full flex flex-col bg-[#0b0b0e] border border-[#222228] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[680px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-[1fr_165px_115px_115px_145px] items-center gap-4 px-6 py-4 border-b border-[#202026] bg-[#08080a]">
                    <div className="text-[12.5px] font-bold text-zinc-400 tracking-wider uppercase">Name & Path</div>
                    <div className="text-[12.5px] font-bold text-zinc-400 tracking-wider uppercase">Subject</div>
                    <div className="text-[12.5px] font-bold text-zinc-400 tracking-wider uppercase">Format</div>
                    <div className="text-[12.5px] font-bold text-zinc-400 tracking-wider uppercase">Size</div>
                    <div className="text-[12.5px] font-bold text-zinc-400 tracking-wider uppercase">Date</div>
                  </div>

                  {/* Table Rows */}
                  <div className="flex flex-col divide-y divide-[#1c1c22]">
                    {currentFolderDocs.map((doc) => (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setSelectedDoc(doc)}
                        className="grid grid-cols-[1fr_165px_115px_115px_145px] items-center gap-4 px-6 py-[18px] hover:bg-[#131317] transition-colors cursor-pointer group w-full text-left focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                      >
                        <div className="flex items-center gap-4 min-w-0 pr-4">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                            style={{
                              backgroundColor: `${doc.subjectColor}15`,
                              borderColor: `${doc.subjectColor}35`,
                              color: doc.subjectColor,
                            }}
                          >
                            <iconify-icon icon="lucide:file-text" width="21" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[15.5px] font-bold text-zinc-100 group-hover:text-white transition-colors truncate">
                                {doc.title}
                              </span>
                              {doc.driveSynced && (
                                <span title="Synced to Google Drive" className="text-sky-400 shrink-0">
                                  <iconify-icon icon="lucide:cloud" width="16" />
                                </span>
                              )}
                            </div>
                            <span className="text-[13px] font-mono text-zinc-400 block truncate mt-0.5">
                              /{doc.dirPath.join('/')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span
                            className="text-[13px] font-bold px-3 py-1 rounded-full border"
                            style={{
                              backgroundColor: `${doc.subjectColor}15`,
                              borderColor: `${doc.subjectColor}35`,
                              color: doc.subjectColor,
                            }}
                          >
                            {doc.subject}
                          </span>
                        </div>

                        <div>
                          <span className="px-3 py-1 rounded-lg bg-[#16161c] border border-borderPanel text-zinc-200 text-[12.5px] font-bold tracking-wide">
                            {doc.type}
                          </span>
                        </div>

                        <div className="text-[14px] font-medium text-zinc-300">{doc.size}</div>
                        <div className="text-[14px] font-medium text-zinc-300">{doc.date}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Upload Document Modal */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          updateUrlParam('modal', null);
        }}
        onUpload={handleUpload}
      />

      {/* Document Details Modal */}
      <DocumentDetailsModal
        isOpen={selectedDoc !== null}
        document={selectedDoc}
        onClose={() => {
          setSelectedDoc(null);
          updateUrlParam('modal', null);
        }}
        onAskAi={() => {
          onNavigateToAi?.();
        }}
      />
    </div>
  );
};
