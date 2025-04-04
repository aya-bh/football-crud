<?php

namespace App\Controller;

use App\Entity\Player;
use App\Repository\PlayerRepository;
use App\Service\PlayerService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/players")
 */
final class PlayerController extends AbstractController
{
    /**
     * @Route("/", methods={"GET"})
     */
    public function index(PlayerRepository $repo): JsonResponse
    {
        $players = $repo->findAll();
        $data = [];

        foreach ($players as $player) {
            $data[] = [
                'id' => $player->getId(),
                'firstName' => $player->getFirstName(),
                'lastName' => $player->getLastName(),
                'position' => $player->getPosition(),
                'team' => $player->getTeam(),
                'age' => $player->getAge(),
                'createdAt' => $player->getCreatedAt()->format('Y-m-d H:i:s'),
                'updatedAt' => $player->getUpdatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return $this->json($data);
    }

    /**
     * @Route("/{id}", methods={"GET"})
     */
    public function show(PlayerRepository $repo, $id): JsonResponse
    {
        $player = $repo->find($id);
        if (!$player) {
            return $this->json(['error' => 'Not found'], 404);
        }

        $data = [
            'id' => $player->getId(),
            'firstName' => $player->getFirstName(),
            'lastName' => $player->getLastName(),
            'position' => $player->getPosition(),
            'team' => $player->getTeam(),
            'age' => $player->getAge(),
            'createdAt' => $player->getCreatedAt()->format('Y-m-d H:i:s'),
            'updatedAt' => $player->getUpdatedAt()->format('Y-m-d H:i:s'),
        ];

        return $this->json($data);
    }

    /**
     * @Route("/", methods={"POST"})
     */
    public function create(Request $request, EntityManagerInterface $em, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $player = new Player();
        $player->setFirstName($data['firstName'])
            ->setLastName($data['lastName'])
            ->setPosition($data['position'])
            ->setTeam($data['team'])
            ->setAge($data['age'])
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable());

        $errors = $validator->validate($player);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], 400);
        }

        $em->persist($player);
        $em->flush();
        return $this->json($player);
    }

    /**
     * @Route("/{id}", methods={"PUT"})
     */
    public function update(Request $request, PlayerRepository $repo, EntityManagerInterface $em, ValidatorInterface $validator, $id): JsonResponse
    {
        $player = $repo->find($id);
        if (!$player) {
            return $this->json(['error' => 'aucun joueur'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $player->setFirstName($data['firstName'])
            ->setLastName($data['lastName'])
            ->setPosition($data['position'])
            ->setTeam($data['team'])
            ->setAge($data['age'])
            ->setUpdatedAt(new \DateTimeImmutable());

        $errors = $validator->validate($player);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], 400);
        }

        $em->flush();
        return $this->json($player);
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function delete(PlayerRepository $repo, EntityManagerInterface $em, $id): JsonResponse
    {
        $player = $repo->find($id);
        if (!$player) return $this->json(['error' => 'aucun joueur'], 404);
        $em->remove($player);
        $em->flush();
        return $this->json(['message' => 'Deleted']);
    }

    /**
     * @Route("/import", methods={"POST"})
     */
    public function import(Request $request, PlayerService $service): JsonResponse
    {
        $file = $request->files->get('file');
        if (!$file) return $this->json(['error' => 'aucun fichier'], 400);
        return $this->json($service->importPlayersFromFile($file->getPathname()));
    }
}
