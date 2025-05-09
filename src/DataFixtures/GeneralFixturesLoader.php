<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Finder\Finder;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use App\Entity\Job;  // Ensure the Job entity is imported

class GeneralFixturesLoader extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $finder = new Finder();
        $finder->files()->in(__DIR__ . '/Fixtures')->name('*.yaml');

        foreach ($finder as $file) {
            $data = Yaml::parseFile($file->getRealPath());

            foreach ($data as $entityClass => $entries) {
                foreach ($entries as $entryData) {
                    $entity = new $entityClass();

                    foreach ($entryData as $key => $value) {
                        $setter = 'set' . ucfirst($key);
                        if (method_exists($entity, $setter)) {
                            // Special handling for the "posted" field if the entity is a Job
                            if ($entity instanceof Job && $key === 'posted') {
                                // Convert the date string to DateTimeImmutable
                                $value = new \DateTimeImmutable($value);
                            }
                            // Handle password hashing for User entities
                            if ($entity instanceof User && $key === 'password') {
                                $value = $this->passwordHasher->hashPassword($entity, $value);
                            }
                            $entity->$setter($value);
                        }
                    }

                    $manager->persist($entity);
                }
            }
        }

        $manager->flush();
    }
}
