"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Thread } from "@/lib/supabase/types";
import { getThreads } from "@/lib/utils";
import { PageTransition, FadeIn } from "@/app/components/ui/transitions";
import ThreadList from "@/app/components/threads/thread-list";
import CreateThread from "@/app/components/threads/create-thread";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";

type UserWithProfile = User & {
  display_name?: string | null;
};

export default function ThreadsPage() {
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [threadsLoading, setThreadsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch user's profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .single();

        setUser({
          ...user,
          display_name: profile?.display_name,
        });
      } else {
        setUser(null);
      }

      // Always fetch threads, whether user is logged in or not
      fetchThreadsData();
    }
    getUser();
  }, []);

  async function fetchThreadsData() {
    try {
      setThreadsLoading(true);
      const threadsData = await getThreads();
      setThreads(threadsData);
    } catch {
      // Error is handled silently for better UX
    } finally {
      setThreadsLoading(false);
    }
  }

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 pt-24">
      <PageTransition>
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <FadeIn>
              <div className="flex flex-col space-y-4">
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    All Discussions
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                    Join the conversation and share your thoughts
                  </p>
                </div>
                {user ? (
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 w-full sm:w-auto">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-base">
                          {(user.display_name ||
                            user.email)?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          Signed in as
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {user.display_name || user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center sm:justify-start"
                  >
                    <Button
                      onClick={handleLogin}
                      className="shadow-lg w-full sm:w-auto"
                    >
                      Sign in to participate
                    </Button>
                  </motion.div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Create Thread Section */}
          {user && (
            <CreateThread
              userId={user.id}
              userEmail={user.display_name || user.email}
            />
          )}

          {/* Stats Section */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {threads.length}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Discussions
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {threads.reduce(
                        (sum, thread) => sum + thread.view_count,
                        0
                      )}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Views</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {threads.reduce(
                        (sum, thread) => sum + thread.post_count,
                        0
                      )}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Replies</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Thread List Section */}
          <FadeIn delay={0.3}>
            <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8">
              <ThreadList threads={threads} loading={threadsLoading} />
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  );
}
