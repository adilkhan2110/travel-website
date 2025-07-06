"use client";

import { Bell, Menu, UserCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminHeader = () => {
  return (
    <header className="w-full px-4 py-3 shadow-md bg-white dark:bg-gray-900 flex items-center justify-between sticky top-0 z-50">
      {/* Center: Search (optional) */}

      {/* Right: Icons */}
      <div className="flex items-center justify-end space-x-4">
        <Button variant="ghost" size="icon">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
