"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FileSystemProvider } from "@/lib/contexts/file-system-context";
import { ChatProvider } from "@/lib/contexts/chat-context";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { FileTree } from "@/components/editor/FileTree";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderActions } from "@/components/HeaderActions";

interface MainContentProps {
  user?: {
    id: string;
    email: string;
  } | null;
  project?: {
    id: string;
    name: string;
    messages: any[];
    data: any;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function MainContent({ user, project }: MainContentProps) {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");

  return (
    <ThemeProvider>
      <FileSystemProvider initialData={project?.data}>
        <ChatProvider projectId={project?.id} initialMessages={project?.messages}>
          <div className="h-screen w-screen overflow-hidden bg-white dark:bg-neutral-950 transition-colors">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Left Panel - Chat */}
              <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
                <div className="h-full flex flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-colors">
                  {/* Chat Header */}
                  <div className="h-14 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                          <path d="M8 11h8v2H8z"/>
                          <path d="M10 7h4v2h-4z"/>
                          <path d="M9 15h6v2H9z"/>
                        </svg>
                      </div>
                      <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">UIGen</h1>
                    </div>
                  </div>

                  {/* Chat Content */}
                  <div className="flex-1 overflow-hidden">
                    <ChatInterface />
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle className="w-[1px] bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors" />

              {/* Right Panel - Preview/Code */}
              <ResizablePanel defaultSize={65}>
                <div className="h-full flex flex-col bg-white dark:bg-neutral-950 transition-colors">
                  {/* Top Bar */}
                  <div className="h-14 border-b border-neutral-200 dark:border-neutral-800 px-6 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
                    <Tabs
                      value={activeView}
                      onValueChange={(v) =>
                        setActiveView(v as "preview" | "code")
                      }
                    >
                      <TabsList className="bg-white/60 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 p-0.5 h-9 shadow-sm backdrop-blur-sm">
                        <TabsTrigger 
                          value="preview" 
                          className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:shadow-sm text-neutral-600 dark:text-neutral-400 px-4 py-1.5 text-sm font-medium transition-all"
                        >
                          Preview
                        </TabsTrigger>
                        <TabsTrigger 
                          value="code" 
                          className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:shadow-sm text-neutral-600 dark:text-neutral-400 px-4 py-1.5 text-sm font-medium transition-all"
                        >
                          Code
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <HeaderActions user={user} projectId={project?.id} />
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 overflow-hidden bg-neutral-50 dark:bg-neutral-950 transition-colors">
                    {activeView === "preview" ? (
                      <div className="h-full bg-white dark:bg-neutral-950 transition-colors">
                        <PreviewFrame />
                      </div>
                    ) : (
                      <ResizablePanelGroup
                        direction="horizontal"
                        className="h-full"
                      >
                        {/* File Tree */}
                        <ResizablePanel
                          defaultSize={30}
                          minSize={20}
                          maxSize={50}
                        >
                          <div className="h-full bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-colors">
                            <FileTree />
                          </div>
                        </ResizablePanel>

                        <ResizableHandle className="w-[1px] bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors" />

                        {/* Code Editor */}
                        <ResizablePanel defaultSize={70}>
                          <div className="h-full bg-white dark:bg-neutral-950 transition-colors">
                            <CodeEditor />
                          </div>
                        </ResizablePanel>
                      </ResizablePanelGroup>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ChatProvider>
      </FileSystemProvider>
    </ThemeProvider>
  );
}
