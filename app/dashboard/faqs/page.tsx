"use client"

import { useState } from "react"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { mockFAQs, type FAQ } from "@/lib/mock-data"

const ITEMS_PER_PAGE = 10

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null)

  // Form states
  const [formQuestion, setFormQuestion] = useState("")
  const [formAnswer, setFormAnswer] = useState("")

  // Filter FAQs by search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedFaqs = filteredFaqs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  // Reset to page 1 when search changes
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  // Add FAQ
  const handleAddFaq = () => {
    if (!formQuestion.trim() || !formAnswer.trim()) return

    const newFaq: FAQ = {
      id: Date.now().toString(),
      question: formQuestion,
      answer: formAnswer,
      hits: 0,
      dateAdded: new Date().toISOString().split("T")[0],
    }
    setFaqs([newFaq, ...faqs])
    setFormQuestion("")
    setFormAnswer("")
    setIsAddModalOpen(false)
  }

  // Edit FAQ
  const handleEditFaq = () => {
    if (!selectedFaq || !formQuestion.trim() || !formAnswer.trim()) return

    setFaqs(
      faqs.map((faq) =>
        faq.id === selectedFaq.id
          ? { ...faq, question: formQuestion, answer: formAnswer }
          : faq
      )
    )
    setSelectedFaq(null)
    setFormQuestion("")
    setFormAnswer("")
    setIsEditModalOpen(false)
  }

  // Delete FAQ
  const handleDeleteFaq = () => {
    if (!selectedFaq) return

    setFaqs(faqs.filter((faq) => faq.id !== selectedFaq.id))
    setSelectedFaq(null)
    setIsDeleteModalOpen(false)
  }

  // Open edit modal
  const openEditModal = (faq: FAQ) => {
    setSelectedFaq(faq)
    setFormQuestion(faq.question)
    setFormAnswer(faq.answer)
    setIsEditModalOpen(true)
  }

  // Open delete modal
  const openDeleteModal = (faq: FAQ) => {
    setSelectedFaq(faq)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Preguntas Frecuentes"
        description="Gestiona las respuestas automaticas de tu asistente"
      >
        <Button
          onClick={() => {
            setFormQuestion("")
            setFormAnswer("")
            setIsAddModalOpen(true)
          }}
          className="bg-[#0F6E56] hover:bg-[#0d5f49]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Agregar FAQ
        </Button>
      </DashboardHeader>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por pregunta o respuesta..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* FAQs Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pregunta</TableHead>
              <TableHead className="hidden lg:table-cell">Respuesta</TableHead>
              <TableHead className="w-[80px] text-center">Hits</TableHead>
              <TableHead className="hidden md:table-cell w-[120px]">
                Fecha
              </TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFaqs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No se encontraron preguntas frecuentes
                </TableCell>
              </TableRow>
            ) : (
              paginatedFaqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium max-w-[250px]">
                    <p className="truncate">{faq.question}</p>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[300px]">
                    <p className="truncate text-muted-foreground">
                      {faq.answer}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">{faq.hits}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {faq.dateAdded}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(faq)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteModal(faq)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} -{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredFaqs.length)} de{" "}
              {filteredFaqs.length}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add FAQ Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Pregunta Frecuente</DialogTitle>
            <DialogDescription>
              Crea una nueva pregunta y respuesta para tu asistente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-question">Pregunta</Label>
              <Input
                id="add-question"
                placeholder="Escribe la pregunta..."
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-answer">Respuesta</Label>
              <Textarea
                id="add-answer"
                placeholder="Escribe la respuesta..."
                value={formAnswer}
                onChange={(e) => setFormAnswer(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddFaq}
              disabled={!formQuestion.trim() || !formAnswer.trim()}
              className="bg-[#0F6E56] hover:bg-[#0d5f49]"
            >
              Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit FAQ Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Pregunta Frecuente</DialogTitle>
            <DialogDescription>
              Modifica la pregunta o respuesta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-question">Pregunta</Label>
              <Input
                id="edit-question"
                placeholder="Escribe la pregunta..."
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-answer">Respuesta</Label>
              <Textarea
                id="edit-answer"
                placeholder="Escribe la respuesta..."
                value={formAnswer}
                onChange={(e) => setFormAnswer(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEditFaq}
              disabled={!formQuestion.trim() || !formAnswer.trim()}
              className="bg-[#0F6E56] hover:bg-[#0d5f49]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Pregunta Frecuente</DialogTitle>
            <DialogDescription>
              Esta seguro que desea eliminar esta pregunta? Esta accion no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {selectedFaq && (
            <div className="rounded-lg bg-muted p-3 text-sm">
              <p className="font-medium">{selectedFaq.question}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteFaq}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
