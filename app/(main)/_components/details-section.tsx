import { ElementRef, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import dynamic from "next/dynamic";
import Checkbox from "./checkbox";

const DetailsSection = () => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const collapse = () => {
    if (sidebarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "620px";
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-white overflow-y-auto relative flex w-[620px] flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsRight className="h-6 w-6" />
        </div>
        <Tabs.Root className="TabsRoot" defaultValue="insight">
          <Tabs.List className="TabsList">
            <Tabs.Trigger
              className="TabsTrigger text-sm font-bold text-gray-500"
              value="insight"
            >
              Insight
            </Tabs.Trigger>
            <Tabs.Trigger
              className="TabsTrigger text-sm font-bold text-gray-500"
              value="actions"
            >
              Action Items
            </Tabs.Trigger>
          </Tabs.List>

          <div>
            <Tabs.Content className="TabsContent" value="insight">
              <div className="py-3">
                <Editor onChange={() => {}} />
              </div>
            </Tabs.Content>

            <Tabs.Content className="TabsContent" value="actions">
              <div className="flex flex-col gap-3 p-3">
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </aside>

      {isCollapsed && (
        <div
          onClick={resetWidth}
          role="button"
          className={cn(
            "h-10 w-10 p-2 flex items-center justify-center text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 border-solid border-2 border-gray-400 absolute top-1/2 right-2 opacity-0 group-hover/sidebar:opacity-100 transition opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
      )}
    </>
  );
};

export default DetailsSection;
