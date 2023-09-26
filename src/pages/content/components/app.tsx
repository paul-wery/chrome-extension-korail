import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TextField from './core/ui/TextField';

export default function App() {
  const [open, setOpen] = useState(true);

  if (!open) return null;
  return (
    <div className="flex w-full justify-center text-gray-800">
      <div className="fixed top-0 left-0 opacity-50 bg-black w-screen h-screen" />
      <div className="fixed top-16 shadow-md p-4 rounded bg-white opacity-100 w-full md:max-w-[70%]">
        <div className="flex gap-2 items-center justify-between mb-8">
          <div className="text-lg font-bold">Easy Train - Train booking</div>
          <XMarkIcon
            className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <TextField className="mt-4">
          <TextField.Label>
            Email de l&apos;avocat
            <TextField.Input
              value={'test'}
              // onChange={(e: any) => setEmail(e.target.value)}
              required
              type="email"
              placeholder={'avocat@email.com'}
            />
          </TextField.Label>
        </TextField>
      </div>
    </div>
  );
}
