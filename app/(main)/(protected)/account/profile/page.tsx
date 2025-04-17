"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { Send, SquarePen, X } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { uploadProfileImageAction, upsertUsername } from "../../actions";
import { useState, useTransition, useRef } from "react";
import UsernameForm from "./usernameForm";
import FullNameForm from "./fullNameForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Account } from "@/types";

export default function ProfilePage() {
  const { authUser, account, setAccount, teamAccounts, teams, loading } =
    useUser();
  const [updateUsername, setUpdateUsername] = useState(false);
  const [updateFullName, setUpdateFullName] = useState(false);
  const [updateProfileImage, setUpdateProfileImage] = useState(false);

  console.log(authUser)

  function UsernameFormOrName() {
    return updateUsername ? (
      <div className="flex flex-row w-fit justify-center align-baseline gap-3 m-auto">
        <UsernameForm />
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateUsername(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center align-baseline gap-3 m-auto">
        <p className="h-fit m-auto">{account?.username}</p>
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateUsername(true)}
        >
          <SquarePen />
        </Button>
      </div>
    );
  }

  function DisplayNameFormOrName() {
    return updateFullName ? (
      <div className="flex flex-row w-fit justify-center align-baseline gap-3 m-auto">
        <FullNameForm />
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateFullName(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center align-baseline gap-3 m-auto">
        <p className="h-fit m-auto">{account?.full_name}</p>
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateFullName(true)}
        >
          <SquarePen />
        </Button>
      </div>
    );
  }

  function AvatarUploadInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profile-image", file);

      try {
        const { url } = await uploadProfileImageAction(formData);
        console.log("Avatar uploaded to: ", url);
        setAccount((prev) =>
          prev ? ({ ...prev, profile_image: url } as Account) : prev
        );
        setUpdateProfileImage(false)
      } catch (err: any) {
        console.error(err.message);
      }

      inputRef.current?.value && (inputRef.current.value = "");
    }

    return (
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        name="profileImage"
        onChange={handleChange}
      />
    );
  }

  function ProfileImage() {
    return (
      <div className="flex flex-row w-fit justify-center align-baseline gap-3 m-auto">
        {updateProfileImage && <AvatarUploadInput />}
        <Avatar className="w-10 h-10 mr-3">
          {account?.profile_image && (
            <AvatarImage
              src={account.profile_image}
              alt={account.full_name ?? ""}
            />
          )}
          <AvatarFallback>{account?.full_name?.slice(0, 2) || 'IS'}</AvatarFallback>
        </Avatar>
        {updateProfileImage ? (
          <Button
            className="h-9"
            size="sm"
            onClick={() => setUpdateProfileImage(false)}
          >
            <X />
          </Button>
        ) : (
          <Button
            className="h-9"
            size="sm"
            onClick={() => setUpdateProfileImage(true)}
          >
            <SquarePen />
          </Button>
        )}
      </div>
    );
  }

  return (
    <section>
      <h1 className="text-3xl my-3">Your Infinite Spaces Profile</h1>
      <hr className="my-3" />
      <div className="flex flex-row justify-between align-baseline">
        <div className="">
          <h4>Site Username</h4>
          <p className="text-sm">
            This username is not used for authentication
          </p>
        </div>

        <div>{UsernameFormOrName()}</div>
      </div>
      <hr className="my-3" />
      <div className="flex flex-row justify-between align-baseline">
        <div>
          <h4>Profile Image</h4>
          <p className="text-sm">Upload your own image as your avatar</p>
        </div>
        <div>{ProfileImage()}</div>
      </div>
      <hr className="my-3" />
      <div className="flex flex-row justify-between align-baseline">
        <div>
          <h4 className="">Site Display Name</h4>
          <p className="text-sm">This is a display name</p>
        </div>
        <div>{DisplayNameFormOrName()}</div>
      </div>
    </section>
  );
}
