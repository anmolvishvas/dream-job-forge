<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $logo = null;

    #[ORM\Column(length: 255)]
    private ?string $industry = null;

    #[ORM\Column(length: 255)]
    private ?string $location = null;

    #[ORM\Column(length: 50)]
    private ?string $employees = null;

    #[ORM\Column(type: 'integer')]
    private ?int $jobs = null;

    #[ORM\Column(type: 'text')]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $website = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $founded = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $values = [];

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $benefits = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(string $logo): self
    {
        $this->logo = $logo;
        return $this;
    }

    public function getIndustry(): ?string
    {
        return $this->industry;
    }

    public function setIndustry(string $industry): self
    {
        $this->industry = $industry;
        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): self
    {
        $this->location = $location;
        return $this;
    }

    public function getEmployees(): ?string
    {
        return $this->employees;
    }

    public function setEmployees(string $employees): self
    {
        $this->employees = $employees;
        return $this;
    }

    public function getJobs(): ?int
    {
        return $this->jobs;
    }

    public function setJobs(int $jobs): self
    {
        $this->jobs = $jobs;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): self
    {
        $this->website = $website;
        return $this;
    }

    public function getFounded(): ?string
    {
        return $this->founded;
    }

    public function setFounded(?string $founded): self
    {
        $this->founded = $founded;
        return $this;
    }

    public function getValues(): ?array
    {
        return $this->values;
    }

    public function setValues(?array $values): self
    {
        $this->values = $values;
        return $this;
    }

    public function getBenefits(): ?array
    {
        return $this->benefits;
    }

    public function setBenefits(?array $benefits): self
    {
        $this->benefits = $benefits;
        return $this;
    }
}
