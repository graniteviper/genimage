"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/B1sBwvjQh84
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import dotenv from "dotenv";
import JSZip from "jszip";

dotenv.config();

export function Component({ className, onuploadDone }: { className?: string, onuploadDone: (zipUrl: string) => void }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
        <CardDescription>
          Drag and drop your images or click the button below to select files.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
        <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
        <Button
          variant="outline"
          onClick={() => {
            const zip = new JSZip();
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.multiple = true;
            input.onchange = async () => {
              console.log(input.files);
              const res = await axios.get(
                `http://localhost:8080/pre-signed-url`
              );
              const url = res.data.url;
              const key = res.data.key;

              if (input.files) {
                for (const file of input.files) {
                  zip.file(file.name, await file.arrayBuffer());
                }
                const content = await zip.generateAsync({ type: "blob" });
                const formData = new FormData();
                formData.append("file", content);
                const res = await axios.put(url, formData);
                onuploadDone(`${process.env.NEXT_PUBLIC_ZIP_BASE_URL_CLOUDFLARE}/${key}`)
              }
            };
            input.click();
          }}
        >
          Select Files
        </Button>
      </CardContent>
    </Card>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}


// curl https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload -X POST -F "file=@/path/to/your/image.jpg" -F "upload_preset=YOUR_UPLOAD_PRESET_NAME"