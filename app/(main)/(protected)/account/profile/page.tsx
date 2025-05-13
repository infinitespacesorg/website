"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { SquarePen, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadProfileImageAction } from "./actions";
import { useState, useRef } from "react";
import UsernameForm from "./usernameForm";
import FullNameForm from "./fullNameForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { account, setAccount } =
    useUser();
  const [updateUsername, setUpdateUsername] = useState(false);
  const [updateFullName, setUpdateFullName] = useState(false);
  const [updateProfileImage, setUpdateProfileImage] = useState(false);

  function UsernameFormOrName() {
    return updateUsername ? (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <UsernameForm setUpdateUsername={setUpdateUsername}/>
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateUsername(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <p className="h-fit m-auto text-sm md:text-base">{account?.username}</p>
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
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <FullNameForm setUpdateFullName={setUpdateFullName}/>
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateFullName(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <p className="h-fit m-auto text-sm md:text-base">{account?.full_name}</p>
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
        // console.log("Avatar uploaded to: ", url);
        // await refreshUserContext()
        setAccount((prev) =>
          prev ? { ...prev, profile_image: url } : prev
        );
        setUpdateProfileImage(false)
      } catch (err: any) {
        // console.error(err.message);
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
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        {updateProfileImage && <AvatarUploadInput />}
        <Avatar className="w-8 h-8 md:w-10 md:h-10 mr-2">
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
      <h1 className="text-xl md:text-3xl my-3">Your Infinite Spaces Profile</h1>
      <hr className="my-3" />
      <div className="flex flex-row justify-between items-center gap-2">
        <div>
          <h4 className="text-lg md:text-base">Site Username</h4>
          <p className="text-xs md:text-sm">
            This username is not used for authentication
          </p>
        </div>
        <div>{UsernameFormOrName()}</div>
      </div>
      <hr className="my-3" />
      <div className="flex flex-row justify-between items-center gap-2">
        <div>
          <h4 className="text-lg md:text-base">Profile Image</h4>
          <p className="text-xs md:text-sm">Upload your own image as your avatar</p>
        </div>
        <div>{ProfileImage()}</div>
      </div>
      <hr className="my-3" />
      <div className="flex flex-row justify-between items-center gap-2">
        <div>
          <h4 className="text-lg md:text-base">Site Display Name</h4>
          <p className="text-xs md:text-sm">This is a display name</p>
        </div>
        <div>{DisplayNameFormOrName()}</div>
      </div>
    </section>
  );
}
