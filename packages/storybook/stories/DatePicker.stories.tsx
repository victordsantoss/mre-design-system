import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker, type DateRangeValue } from '@ds/components'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const DataUnica: Story = {
  name: 'Data única',
  render: () => {
    const [value, setValue] = useState<Date | null>(null)
    return (
      <div className="max-w-sm p-4">
        <DatePicker label="Data" value={value} onChange={setValue} helperText="Calendário GovBR (painel local)." />
      </div>
    )
  },
}

export const ComHorario: Story = {
  name: 'Com horário',
  render: () => {
    const [value, setValue] = useState<Date | null>(null)
    return (
      <div className="max-w-sm p-4">
        <DatePicker label="Data e hora" value={value} onChange={setValue} withTime />
      </div>
    )
  },
}

export const Intervalo: Story = {
  name: 'Intervalo',
  render: () => {
    const [range, setRange] = useState<DateRangeValue>({ start: null, end: null })
    return (
      <div className="max-w-sm p-4">
        <DatePicker
          label="Período"
          selectionMode="range"
          valueRange={range}
          onRangeChange={setRange}
        />
      </div>
    )
  },
}
