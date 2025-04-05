"use client";

import { ChevronRight, Lock } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { SidebarNavLinks } from "@/lib/types";
import Link from "next/link";
import useCompanyPremiumModal from "@/store/useCompanyPremiumModal";
import usePremiumModal from "@/store/usePremiumModal";

export function SidebarMainNav({
  items,
  subscriptionLevel,
  type,
}: {
  items: SidebarNavLinks[];
  subscriptionLevel: "FREE" | "PRO" | "ELITE";
  type: "job-seeker" | "employer" | "admin";
}) {
  const levelRank = { FREE: 0, PRO: 1, ELITE: 2 };
  const pathname = usePathname();
  const { setOpenCompanyPremiumModal } = useCompanyPremiumModal();
  const { setOpenPremiumModal } = usePremiumModal();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;
          // Determine if the main item should be disabled

          let isDisabled = false;

          if (item.isPremium && subscriptionLevel === "FREE") {
            isDisabled = true;
          }

          if (
            item.subscriptionLevel &&
            levelRank[subscriptionLevel] < levelRank[item.subscriptionLevel]
          ) {
            isDisabled = true;
          }

          // const isDisabled = subscriptionLevel === "FREE" && item.isPremium;
          return (
            <Collapsible
              defaultOpen={true}
              key={item.title}
              asChild
              className="group/collapsible"
            >
              {item.items && item.items.length > 0 ? (
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    {isDisabled ? (
                      <div
                        className={cn(
                          "flex items-center w-full px-3 py-2 rounded-md text-gray-400 ",
                          isActive && "bg-primary text-white"
                        )}
                        title={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <Lock className="ml-1" size={16} />
                      </div>
                    ) : (
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={cn("", isActive && "bg-primary text-white")}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubItemActive = pathname === subItem.url;
                        let isSubItemDisabled = false;

                        if (subItem.isPremium && subscriptionLevel === "FREE") {
                          isSubItemDisabled = true;
                        }

                        if (
                          subItem.subscriptionLevel &&
                          levelRank[subscriptionLevel] <
                            levelRank[subItem.subscriptionLevel]
                        ) {
                          isSubItemDisabled = true;
                        }
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              {isSubItemDisabled ? (
                                <button
                                  onClick={() => {
                                    if (type === "job-seeker") {
                                      setOpenPremiumModal(true);
                                    } else if (type === "employer") {
                                      setOpenCompanyPremiumModal(true);
                                    }
                                  }}
                                  className={cn(
                                    "block w-full px-3 py-2 rounded-md text-muted-foreground cursor-pointer",
                                    isSubItemActive && "bg-primary text-white"
                                  )}
                                  title={subItem.title}
                                >
                                  {subItem.icon && (
                                    <subItem.icon
                                      className={cn(
                                        isSubItemActive &&
                                          "stroke-white group-hover/icon:stroke-black dark:group-hover/icon:stroke-white"
                                      )}
                                    />
                                  )}
                                  <span>{subItem.title}</span>
                                  <Lock className="ml-1" size={16} />
                                </button>
                              ) : (
                                <Link
                                  href={subItem.url}
                                  className={cn(
                                    "block w-full px-3 py-2 rounded-md",
                                    isSubItemActive &&
                                      "bg-primary text-white group/icon"
                                  )}
                                >
                                  {subItem.icon && (
                                    <subItem.icon
                                      className={cn(
                                        isSubItemActive &&
                                          "stroke-white group-hover/icon:stroke-black dark:group-hover/icon:stroke-white"
                                      )}
                                    />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              )}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              ) : (
                // For main items with no children
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    {isDisabled ? (
                      <div
                        className={cn(
                          "flex items-center w-full px-3 py-2 rounded-md text-gray-400 cursor-not-allowed",
                          isActive && "bg-primary text-white"
                        )}
                        title={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <Lock className="ml-1" size={16} />
                      </div>
                    ) : (
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center w-full px-3 py-2 rounded-md",
                          isActive && "bg-primary text-white"
                        )}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
