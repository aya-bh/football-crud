<?php

namespace App\Service;

use App\Entity\Player;
use Doctrine\ORM\EntityManagerInterface;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PlayerService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function importPlayersFromFile(string $filePath): array
    {
        if (!file_exists($filePath)) {
            return ['error' => 'File not found: ' . $filePath];
        }

        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();

        $players = [];
        $rowIndex = 0;

        foreach ($sheet->getRowIterator() as $row) {
            $rowIndex++;

            // Skip the header row (assuming first row is header)
            if ($rowIndex === 1) {
                continue;
            }

            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(false); // Important for empty cells

            $cells = [];
            foreach ($cellIterator as $cell) {
                $cells[] = $cell->getValue();
            }

            if (count($cells) < 5 || empty($cells[0]) || empty($cells[1])) {
                continue;
            }

            $player = new Player();
            $player->setFirstName(trim($cells[0]))
                ->setLastName(trim($cells[1]))
                ->setPosition(trim($cells[2]))
                ->setTeam(trim($cells[3]))
                ->setAge((int) $cells[4])
                ->setCreatedAt(new \DateTimeImmutable())
                ->setUpdatedAt(new \DateTimeImmutable());

            $this->em->persist($player);
            $players[] = $player;
        }

        $this->em->flush();

        return ['message' => 'Import successful', 'imported' => count($players)];
    }
}
