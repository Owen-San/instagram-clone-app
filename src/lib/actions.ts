"use server";

import prisma from "@/lib/prisma";
// import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";