"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function CreatePodcast() {
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePrompt, setImagePrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const voicecategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 text-white-1 font-bold">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="IketheGreat"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 text-white-1 font-bold">
                Select AI Voice
              </Label>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger
                  className={cn(
                    "w-full text-16 border-none bg-black-1 text-gray-1"
                  )}
                >
                  <SelectValue
                    placeholder="Select AI Voice"
                    className="placeholder:text-gray-1"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voicecategories.map((voice) => (
                    <SelectItem
                      key={voice}
                      value={voice}
                      className="text-16 text-white-1 focus:bg-orange-1 capitalize"
                    >
                      {voice}
                    </SelectItem>
                  ))}
                  {voiceType && (
                    <audio
                      src={`/${voiceType}.mp3`}
                      autoPlay
                      className="hidden"
                    />
                  )}
                </SelectContent>
              </Select>
            </div>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 text-white-1 font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="Write a short description about the podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast />

            <GenerateThumbnail />
          </div>

          <div className="mt-10 w-full">
            <Button
              type="submit"
              className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
            >
              {isSubmitting ? (
                <>
                  <Loader className="size animate-spin mr-1"/>
                  Submitting
                </>
              ) : (
                "Submit & Publish Podcast"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
