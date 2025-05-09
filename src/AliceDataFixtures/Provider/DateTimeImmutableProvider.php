<?php

namespace App\Doctrine\AliceDataFixtures\Provider;

use Faker\Provider\Base;
use Faker\Provider\DateTime;

class DateTimeImmutableProvider extends Base
{
    public function immutableDateTime(string $date = 'now'): \DateTimeImmutable
    {
        return new \DateTimeImmutable($date,);
    }
    public function immutableDateTimeByFormat(string $format, string $date = 'now'): \DateTimeImmutable
    {
        $datetime = new \DateTime($date);
        return new \DateTimeImmutable($datetime->format($format),);
    }
    public function immutableDateTimeBetween(string $startDate = '-2 years', string $endDate = 'now', ?string $timezone = null): \DateTimeImmutable
    {
        return \DateTimeImmutable::createFromMutable(DateTime::dateTimeBetween($startDate, $endDate, $timezone),);
    }
    public function immutableDateTimeBetweenByFormat(string $format, string $startDate = '-2 years', string $endDate = 'now', ?string $timezone = null): \DateTimeImmutable
    {
        return new \DateTimeImmutable(DateTime::dateTimeBetween($startDate, $endDate, $timezone)->format($format),);
    }
}
