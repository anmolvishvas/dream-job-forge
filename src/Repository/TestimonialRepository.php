<?php

namespace App\Repository;

use App\Entity\Testimonial;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class TestimonialRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Testimonial::class);
    }

    public function findTopRated(int $limit): array
    {
        return $this->createQueryBuilder('t')
            ->orderBy('t.rating', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }
}
