import { motion } from "framer-motion";
import { Music4, Upload, Image, Languages, Smile, User, FileMusic,} from "lucide-react";

import { useForm } from "react-hook-form";
import useHome from '../hooks/useHome'
import UploadLoader from "../components/UploadeLoader";
import BackButton from "../../../shared/BackButton";


export default function UploadNasheed() {

const {handleUploadSong} = useHome()
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors,isSubmitting },
  } = useForm();

  
  const title = watch("title");
  const artist = watch("artist");
  const mood = watch("mood");
  const language = watch("language");
  const description = watch("description", "");
  const cover = watch("coverImage", []);

  

  const previewImage =
    cover?.length > 0 ? URL.createObjectURL(cover[0]) : null;

  const onSubmit = async(data) => {

    await handleUploadSong(data)

    console.log(data);
    reset()
  };

  if(isSubmitting){
    return <UploadLoader/>
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* Background */}

      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[220px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-10">

        {/* Header */}
        
        <BackButton/>
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="mb-12"
        >

          <p className="font-space-grotesk text-sm font-semibold uppercase tracking-[3px] text-[var(--primary)]">
            Moodify Admin
          </p>

          <h1 className="mt-3 font-space-grotesk text-5xl font-bold tracking-tight">
            Upload New Nasheed
          </h1>

          <p className="mt-4 max-w-2xl leading-8 text-[var(--text-muted)]">
            Upload Arabic or Urdu Nasheeds with beautiful artwork so
            Moodify AI can recommend them according to the user's mood.
          </p>

        </motion.div>

        {/* Main Card */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-10 shadow-[0_25px_70px_rgba(0,0,0,.35)] backdrop-blur-2xl"
        >

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* FIRST ROW */}

            <div className="grid gap-7 lg:grid-cols-2">

              {/* Title */}

              <div>

                <label className="mb-3 flex items-center gap-2 font-space-grotesk text-sm font-semibold uppercase tracking-[2px]">

                  <Music4
                    size={18}
                    className="text-violet-400"
                  />

                  Title

                </label>

                <input
                  type="text"
                  placeholder="Enter Nasheed Title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  className="h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-light)] px-5 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />

                {errors.title && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.title.message}
                  </p>
                )}

              </div>

              {/* Artist */}

              <div>

                <label className="mb-3 flex items-center gap-2 font-space-grotesk text-sm font-semibold uppercase tracking-[2px]">

                  <User
                    size={18}
                    className="text-cyan-400"
                  />

                  Artist

                </label>

                <input
                  type="text"
                  placeholder="Artist Name"
                  {...register("artist", {
                    required: "Artist is required",
                  })}
                  className="h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-light)] px-5 outline-none transition-all duration-300 focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/20"
                />

                {errors.artist && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.artist.message}
                  </p>
                )}

              </div>

            </div>
                        {/* SECOND ROW */}

            <div className="mt-7 grid gap-7 lg:grid-cols-2">

              {/* Mood */}

              <div>

                <label className="mb-3 flex items-center gap-2 font-space-grotesk text-sm font-semibold uppercase tracking-[2px]">

                  <Smile
                    size={18}
                    className="text-yellow-400"
                  />

                  Mood

                </label>

                <select
                  defaultValue=""
                  {...register("mood", {
                    required: "Please select a mood",
                  })}
                  className="
                  h-14
                  w-full
                  appearance-none
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface-light)]
                  px-5
                  text-[var(--text)]
                  outline-none
                  transition-all
                  duration-300
                  focus:border-[var(--primary)]
                  focus:ring-2
                  focus:ring-[var(--primary)]/20
                "
                >

                  <option value="" disabled className="bg-[var(--surface)]">
                    Select Mood
                  </option>

                  <option value="Happy" className="bg-[var(--surface)]">
                    Happy
                  </option>

                  <option value="Sad" className="bg-[var(--surface)]">
                    Sad
                  </option>

                  <option value="Surprised" className="bg-[var(--surface)]">
                    Surprised
                  </option>

                </select>

                {errors.mood && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.mood.message}
                  </p>
                )}

              </div>

              {/* Language */}

              <div>

                <label className="mb-3 flex items-center gap-2 font-space-grotesk text-sm font-semibold uppercase tracking-[2px]">

                  <Languages
                    size={18}
                    className="text-emerald-400"
                  />

                  Language

                </label>

                <select
                  defaultValue=""
                  {...register("language", {
                    required: "Please select a language",
                  })}
                  className="
                  h-14
                  w-full
                  appearance-none
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface-light)]
                  px-5
                  text-[var(--text)]
                  outline-none
                  transition-all
                  duration-300
                  focus:border-[var(--secondary)]
                  focus:ring-2
                  focus:ring-[var(--secondary)]/20
                "
                >

                  <option value="" disabled className="bg-[var(--surface)]">
                    Select Language
                  </option>

                  <option value="urdu" className="bg-[var(--surface)]">
                    Urdu
                  </option>

                  <option value="arabic" className="bg-[var(--surface)]">
                    Arabic
                  </option>

                  <option value="english" className="bg-[var(--surface)]">
                    English
                  </option>

                </select>

                {errors.language && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.language.message}
                  </p>
                )}

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-8">

              <label className="mb-3 flex items-center gap-2 font-space-grotesk text-sm font-semibold uppercase tracking-[2px]">

                <FileMusic
                  size={18}
                  className="text-violet-400"
                />

                Description

              </label>

              <textarea
                rows={6}
                placeholder="Write a short description..."
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 30,
                    message: "Minimum 30 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Maximum 200 characters",
                  },
                })}
                className="
                w-full
                resize-none
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--surface-light)]
                p-5
                leading-7
                outline-none
                transition-all
                duration-300
                focus:border-[var(--primary)]
                focus:ring-2
                focus:ring-[var(--primary)]/20
              "
              />

              <div className="mt-2 flex justify-between">

                {errors.description ? (

                  <p className="text-sm text-red-400">
                    {errors.description.message}
                  </p>

                ) : (

                  <p className="text-sm text-[var(--text-muted)]">
                    30–200 characters
                  </p>

                )}

                <p
                  className={`text-sm ${
                    description.length > 200
                      ? "text-red-400"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {description.length}/200
                </p>

              </div>

            </div>
                        {/* ================= Upload Section ================= */}

            <div className="mt-10 grid gap-8 lg:grid-cols-2">

              {/* Cover Image */}

              <div>

                <label className="mb-4 flex items-center gap-2 font-space-grotesk text-sm font-semibold uppercase tracking-[2px]">

                  <Image
                    size={18}
                    className="text-violet-400"
                  />

                  Cover Image

                </label>

                <label
                  className="
                  group
                  flex
                  h-72
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-3xl
                  border-2
                  border-dashed
                  border-[var(--border)]
                  bg-[var(--surface-light)]
                  transition-all
                  duration-300
                  hover:border-violet-500
                  hover:bg-[var(--surface)]
                  "
                >

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/15">

                    <Image
                      size={34}
                      className="text-violet-300"
                    />

                  </div>

                  <h3 className="font-space-grotesk text-lg font-bold">

                    Upload Cover

                  </h3>

                  <p className="mt-2 text-center text-sm text-[var(--text-muted)]">

                    PNG • JPG • WEBP

                  </p>

                  <span
                    className="
                    mt-5
                    rounded-xl
                    bg-violet-600
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    transition
                    group-hover:bg-violet-500
                    "
                  >

                    Browse Image

                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("coverImage", {
                      required: "Cover image is required",
                    })}
                  />

                </label>

                {errors.coverImage && (

                  <p className="mt-2 text-sm text-red-400">
                    {errors.coverImage.message}
                  </p>

                )}

              </div>

              {/* Audio */}

              <div>

                <label className="mb-4 flex items-center gap-2 font-space-grotesk text-sm font-semibold uppercase tracking-[2px]">

                  <Upload
                    size={18}
                    className="text-cyan-400"
                  />

                  Audio File

                </label>

                <label
                  className="
                  group
                  flex
                  h-72
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-3xl
                  border-2
                  border-dashed
                  border-[var(--border)]
                  bg-[var(--surface-light)]
                  transition-all
                  duration-300
                  hover:border-cyan-500
                  hover:bg-[var(--surface)]
                  "
                >

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15">

                    <Music4
                      size={34}
                      className="text-cyan-300"
                    />

                  </div>

                  <h3 className="font-space-grotesk text-lg font-bold">

                    Upload Nasheed

                  </h3>

                  <p className="mt-2 text-center text-sm text-[var(--text-muted)]">

                    MP3 • WAV • M4A

                  </p>

                  <span
                    className="
                    mt-5
                    rounded-xl
                    bg-cyan-600
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    transition
                    group-hover:bg-cyan-500
                    "
                  >

                    Browse Audio

                  </span>

                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    {...register("audioFile", {
                      required: "Audio file is required",
                    })}
                  />

                </label>

                {errors.audioFile && (

                  <p className="mt-2 text-sm text-red-400">
                    {errors.audioFile.message}
                  </p>

                )}

              </div>

            </div>
                        {/* ================= Preview ================= */}

            <div
              className="
              mt-10
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface-light)]
              p-8
            "
            >

              <h3 className="mb-6 font-space-grotesk text-2xl font-bold text-[var(--text)]">

                Preview

              </h3>

              <div className="flex flex-col gap-8 md:flex-row">

                {/* Cover Preview */}

                <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20">

                  {previewImage ? (

                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <Image
                      size={52}
                      className="text-[var(--text-muted)]"
                    />

                  )}

                </div>

                {/* Content */}

                <div className="flex flex-1 flex-col justify-center">

                  <h2 className="font-space-grotesk text-3xl font-bold tracking-tight text-[var(--text)]">

                    {title || "Nasheed Title"}

                  </h2>

                  <p className="mt-2 text-lg text-[var(--text-secondary)]">

                    {artist || "Artist Name"}

                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">

                    <span className="rounded-full bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-300">

                      {mood || "Mood"}

                    </span>

                    <span className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-300">

                      {language || "Language"}

                    </span>

                  </div>

                  <p className="mt-6 leading-8 text-[var(--text-muted)]">

                    {description || "Your description will appear here..."}

                  </p>

                </div>

              </div>

            </div>

            {/* ================= Buttons ================= */}

            <div className="mt-12 flex flex-col justify-end gap-4 sm:flex-row">

              <button
                type="button"
                onClick={() => reset()}
                className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--surface-light)]
                px-8
                py-4
                font-space-grotesk
                font-semibold
                text-[var(--text)]
                transition-all
                duration-300
                hover:border-[var(--primary)]
                hover:bg-[var(--surface)]
                "
              >

                Reset

              </button>

              <button
                type="submit"
                className="
                rounded-2xl
                bg-gradient-to-r
                from-[var(--primary)]
                via-[var(--primary-glow)]
                to-[var(--secondary)]
                px-10
                py-4
                font-space-grotesk
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_35px_rgba(99,102,241,0.35)]
                active:scale-95
                "
              >

                Upload Nasheed

              </button>

            </div>

          </form>

        </motion.div>

      </div>

    </div>

  );

}