// components/ClientCard.tsx
'use client';

import { createClient } from '@/services/client-service';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useEffect, useState } from 'react';

interface ClientCardProps {
  onClientCreated?: (name: string, id: number, selected: string) => void;
}


export default function ClientCard({ onClientCreated }: ClientCardProps) {
  const [selected, setSelected] = useState<'ninguno' | 'default' | 'custom'>('ninguno');
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [id, setId] = useState<number>();
  let createdName = formData.name || 'Cliente por defecto';
  useEffect(() => {
    console.log('Selected changed to:', selected);
    console.log('Selected changed to:', id);

  });

  // Crear cliente total
  const handleClientCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    let cli;
    // alert(selected)
    // Aquí podrías agregar la lógica para crear el cliente
    if (selected === 'default') {

      setFormData({ name: "Cliente por defecto", email: "defaul@gmail.com", phone: "12312412" });
      // alert("data informada")
      // alert(JSON.stringify(formData))
      cli = await createClient(formData);
      setId(cli.id);
      createdName = formData.name;

    } else if (selected === 'custom') {
      console.log('Cliente data:', formData);

      cli = await createClient(formData);
      setId(cli.id);
      createdName = formData.name;
    }

    if (onClientCreated && cli && typeof cli.id === 'number') {
      onClientCreated(createdName, cli.id, selected); // 🔥 Retornás el nombre al padre
    }
    // Resetear el formulario
    setSelected('ninguno');
    //  setFormData({ name: '', email: '', phone: '' });
  }

  return (
    <div className=" border rounded-lg p-4 shadow-md w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Seleccionar Cliente</h2>
      <div className=' p-2'>
        <RadioGroup.Root
          className="flex flex-wrap sm:items-center sm:gap-6 gap-3 mb-4"
          value={selected}
          onValueChange={(value) =>
            setSelected(value as 'ninguno' | 'default' | 'custom')
          }
        >
          <div className="flex items-center gap-2">
            <RadioGroup.Item
              value="ninguno"
              id="r-ninguno"
              className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
            />
            <label htmlFor="r-ninguno" className="text-sm">Ninguno</label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroup.Item
              value="default"
              id="r-default"
              className="flex w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
            />
            <label htmlFor="r-default" className="text-sm">Cliente por defecto</label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroup.Item
              value="custom"
              id="r-custom"
              className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
            />
            <label htmlFor="r-custom" className="text-sm">Agregar cliente</label>
          </div>
        </RadioGroup.Root>
      </div>


      {selected === 'default' && (
        <form className="space-y-3">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleClientCreation}
          >
            Crear Cliente por defecto
          </button>
        </form>
      )}

      {selected === 'custom' && (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="juan@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="+54 9 11 1234-5678"
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleClientCreation}
          >
            Crear Cliente
          </button>
        </form>
      )}
    </div>
  );
}